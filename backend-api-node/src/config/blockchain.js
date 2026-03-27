const { ethers } = require("ethers");
const logger = require("./logger");

// Minimal ABI covering the functions the gateway calls.
const WAQFI_ABI = [
  "function mintFractional(bytes32 partition, address to, uint256 amount, bytes data)",
  "function addToWhitelist(address account)",
  "function isWhitelisted(address account) view returns (bool)",
  "function balanceOfByPartition(bytes32 partition, address holder) view returns (uint256)",
  "function totalSupplyByPartition(bytes32 partition) view returns (uint256)",
  "function waqfAssets(bytes32) view returns (string name, string location, uint256 targetAmount, uint256 raisedAmount, address mauqufAlaih, bool fullyFunded)",
  "function totalPartitions() view returns (bytes32[])",
];

let provider, signer, contract;

function getContract() {
  if (contract) return contract;

  const rpc = process.env.RPC_URL;
  const pk = process.env.MINTER_PRIVATE_KEY;
  const addr = process.env.CONTRACT_ADDRESS;

  if (!rpc || !pk || !addr) {
    logger.warn("Blockchain config incomplete — contract calls will fail");
    return null;
  }

  provider = new ethers.JsonRpcProvider(rpc);
  signer = new ethers.Wallet(pk, provider);
  contract = new ethers.Contract(addr, WAQFI_ABI, signer);
  return contract;
}

module.exports = { getContract, WAQFI_ABI };
