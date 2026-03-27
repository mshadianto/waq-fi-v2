// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title WaqFiFractional
 * @notice ERC-1400–style security token for fractionalised waqf assets.
 *
 * Design decisions aligned with DSN-MUI / BWI compliance:
 *   - Only KYC-whitelisted addresses may hold tokens (VIDA / PrivyID verified).
 *   - Transfers are restricted: sender AND receiver must be whitelisted.
 *   - ROI distribution is on-chain to the Mauquf Alaih beneficiary wallet.
 *   - Partition-based balances allow multiple waqf asset classes per contract.
 *
 * Implements a minimal ERC-1400 surface (partitions, controlled transfers,
 * document management) without inheriting a full third-party ERC-1400 lib,
 * keeping the attack surface small and audit-friendly.
 */
contract WaqFiFractional is AccessControl, ReentrancyGuard, Pausable {
    // ──────────────────────────── Roles ────────────────────────────
    bytes32 public constant COMPLIANCE_ROLE = keccak256("COMPLIANCE_ROLE");
    bytes32 public constant MINTER_ROLE     = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE     = keccak256("PAUSER_ROLE");

    // ──────────────────────────── Constants ────────────────────────
    /// Minimum fractional participation in token units (Rp 10.000 equivalent).
    uint256 public constant MIN_FRACTION = 1;

    // ──────────────────────────── State ────────────────────────────

    /// @dev Whitelisted (KYC-verified) addresses.
    mapping(address => bool) private _whitelisted;

    /// @dev Partition → holder → balance.
    mapping(bytes32 => mapping(address => uint256)) private _balances;

    /// @dev Partition → total supply.
    mapping(bytes32 => uint256) private _totalSupplyByPartition;

    /// @dev List of all partitions ever created.
    bytes32[] private _partitions;
    mapping(bytes32 => bool) private _partitionExists;

    /// @dev Holder → list of partitions they hold tokens in.
    mapping(address => bytes32[]) private _partitionsOf;

    /// @dev ERC-1400 document store: name → (uri, hash).
    struct Document {
        string uri;
        bytes32 docHash;
        uint256 updatedAt;
    }
    mapping(bytes32 => Document) private _documents;
    bytes32[] private _documentNames;

    /// @dev Waqf asset metadata per partition.
    struct WaqfAsset {
        string  name;           // e.g. "Masjid Al-Ikhlas Expansion"
        string  location;       // physical asset location
        uint256 targetAmount;   // funding target in token units
        uint256 raisedAmount;   // tokens minted so far
        address mauqufAlaih;    // beneficiary wallet
        bool    fullyFunded;
    }
    mapping(bytes32 => WaqfAsset) public waqfAssets;

    // ──────────────────────────── Events ───────────────────────────
    event Whitelisted(address indexed account);
    event RemovedFromWhitelist(address indexed account);
    event IssuedByPartition(
        bytes32 indexed partition,
        address indexed to,
        uint256 amount,
        bytes   data
    );
    event TransferredByPartition(
        bytes32 indexed partition,
        address indexed from,
        address indexed to,
        uint256 amount,
        bytes   data
    );
    event ROIDistributed(
        bytes32 indexed partition,
        address indexed mauqufAlaih,
        uint256 amount
    );
    event WaqfAssetRegistered(bytes32 indexed partition, string name);
    event DocumentUpdated(bytes32 indexed name, string uri, bytes32 docHash);

    // ──────────────────────────── Modifiers ────────────────────────
    /**
     * @dev Ensures the target address has passed e-KYC verification
     *      through VIDA or PrivyID before any token movement.
     */
    modifier onlyWhitelisted(address account) {
        require(_whitelisted[account], "WaqFi: address not KYC-verified");
        _;
    }

    // ──────────────────────────── Constructor ──────────────────────
    constructor(address admin) {
        require(admin != address(0), "WaqFi: zero admin");
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(COMPLIANCE_ROLE, admin);
        _grantRole(MINTER_ROLE, admin);
        _grantRole(PAUSER_ROLE, admin);
    }

    // ────────────────────── Whitelist Management ──────────────────
    /**
     * @notice Add a KYC-verified address to the whitelist.
     *         Called by backend after VIDA/PrivyID verification succeeds.
     */
    function addToWhitelist(address account)
        external
        onlyRole(COMPLIANCE_ROLE)
    {
        require(account != address(0), "WaqFi: zero address");
        _whitelisted[account] = true;
        emit Whitelisted(account);
    }

    function removeFromWhitelist(address account)
        external
        onlyRole(COMPLIANCE_ROLE)
    {
        _whitelisted[account] = false;
        emit RemovedFromWhitelist(account);
    }

    function isWhitelisted(address account) external view returns (bool) {
        return _whitelisted[account];
    }

    // ──────────────────── Waqf Asset Registration ─────────────────
    /**
     * @notice Register a new waqf asset as a token partition.
     * @param partition   Unique identifier (e.g. keccak of asset name).
     * @param name        Human-readable asset name.
     * @param location    Physical location of the asset.
     * @param target      Funding target in fractional units.
     * @param beneficiary Mauquf Alaih wallet that receives ROI.
     */
    function registerWaqfAsset(
        bytes32 partition,
        string calldata name,
        string calldata location,
        uint256 target,
        address beneficiary
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(!_partitionExists[partition], "WaqFi: partition exists");
        require(beneficiary != address(0), "WaqFi: zero beneficiary");
        require(target > 0, "WaqFi: zero target");

        _partitions.push(partition);
        _partitionExists[partition] = true;

        waqfAssets[partition] = WaqfAsset({
            name:        name,
            location:    location,
            targetAmount: target,
            raisedAmount: 0,
            mauqufAlaih: beneficiary,
            fullyFunded: false
        });

        emit WaqfAssetRegistered(partition, name);
    }

    // ──────────────────── Fractional Minting (ERC-1400 issue) ─────
    /**
     * @notice Mint fractional waqf tokens to a KYC-verified participant.
     * @dev    Enforces the Rp 10.000 minimum participation rule.
     *         Only callable by MINTER_ROLE (backend service after payment confirmation).
     */
    function mintFractional(
        bytes32 partition,
        address to,
        uint256 amount,
        bytes calldata data
    )
        external
        onlyRole(MINTER_ROLE)
        onlyWhitelisted(to)
        whenNotPaused
        nonReentrant
    {
        require(_partitionExists[partition], "WaqFi: unknown partition");
        require(amount >= MIN_FRACTION, "WaqFi: below minimum fraction");

        WaqfAsset storage asset = waqfAssets[partition];
        require(!asset.fullyFunded, "WaqFi: fully funded");
        require(
            asset.raisedAmount + amount <= asset.targetAmount,
            "WaqFi: exceeds target"
        );

        // Update balances
        if (_balances[partition][to] == 0) {
            _partitionsOf[to].push(partition);
        }
        _balances[partition][to] += amount;
        _totalSupplyByPartition[partition] += amount;
        asset.raisedAmount += amount;

        if (asset.raisedAmount == asset.targetAmount) {
            asset.fullyFunded = true;
        }

        emit IssuedByPartition(partition, to, amount, data);
    }

    // ──────────────────── Controlled Transfer (ERC-1400) ──────────
    /**
     * @notice Transfer tokens between two KYC-verified addresses.
     *         Both sender and receiver must be on the whitelist.
     */
    function transferByPartition(
        bytes32 partition,
        address from,
        address to,
        uint256 amount,
        bytes calldata data
    )
        external
        onlyRole(COMPLIANCE_ROLE)
        onlyWhitelisted(from)
        onlyWhitelisted(to)
        whenNotPaused
        nonReentrant
    {
        require(
            _balances[partition][from] >= amount,
            "WaqFi: insufficient balance"
        );

        _balances[partition][from] -= amount;
        if (_balances[partition][to] == 0) {
            _partitionsOf[to].push(partition);
        }
        _balances[partition][to] += amount;

        emit TransferredByPartition(partition, from, to, amount, data);
    }

    // ──────────────────── ROI Distribution ────────────────────────
    /**
     * @notice Distribute native-token ROI to the Mauquf Alaih beneficiary.
     *         Funds are sent from the contract balance (deposited by asset manager).
     */
    function distributeROI(bytes32 partition)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
        whenNotPaused
        nonReentrant
    {
        require(_partitionExists[partition], "WaqFi: unknown partition");
        WaqfAsset storage asset = waqfAssets[partition];
        require(asset.mauqufAlaih != address(0), "WaqFi: no beneficiary");
        require(address(this).balance > 0, "WaqFi: no funds to distribute");

        uint256 payout = address(this).balance;
        (bool ok, ) = asset.mauqufAlaih.call{value: payout}("");
        require(ok, "WaqFi: transfer failed");

        emit ROIDistributed(partition, asset.mauqufAlaih, payout);
    }

    // ──────────────────── ERC-1400 Document Management ────────────
    function setDocument(
        bytes32 name,
        string calldata uri,
        bytes32 docHash
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (_documents[name].updatedAt == 0) {
            _documentNames.push(name);
        }
        _documents[name] = Document(uri, docHash, block.timestamp);
        emit DocumentUpdated(name, uri, docHash);
    }

    function getDocument(bytes32 name)
        external
        view
        returns (string memory uri, bytes32 docHash, uint256 updatedAt)
    {
        Document storage doc = _documents[name];
        return (doc.uri, doc.docHash, doc.updatedAt);
    }

    // ──────────────────── View Functions ──────────────────────────
    function balanceOfByPartition(bytes32 partition, address holder)
        external
        view
        returns (uint256)
    {
        return _balances[partition][holder];
    }

    function totalSupplyByPartition(bytes32 partition)
        external
        view
        returns (uint256)
    {
        return _totalSupplyByPartition[partition];
    }

    function partitionsOf(address holder)
        external
        view
        returns (bytes32[] memory)
    {
        return _partitionsOf[holder];
    }

    function totalPartitions() external view returns (bytes32[] memory) {
        return _partitions;
    }

    // ──────────────────── Admin Controls ──────────────────────────
    function pause() external onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    /// @notice Accept native token deposits for ROI distribution pool.
    receive() external payable {}
}
