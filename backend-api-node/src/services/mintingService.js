const { ethers } = require("ethers");
const { getContract } = require("../config/blockchain");
const logger = require("../config/logger");

/**
 * Mint fractional waqf tokens after successful payment.
 *
 * Flow: Payment confirmed → verify KYC on-chain → mint tokens → log to ledger.
 *
 * @param {string} partition - Waqf asset partition identifier.
 * @param {string} walletAddress - Recipient's wallet (must be KYC-whitelisted).
 * @param {number} amount - Number of fractional units to mint.
 * @param {string} paymentRef - Payment reference for audit trail.
 */
async function mintAfterPayment(partition, walletAddress, amount, paymentRef) {
  const contract = getContract();
  if (!contract) throw new Error("Blockchain not configured");

  // Pre-flight: confirm the wallet is KYC-whitelisted on-chain
  const whitelisted = await contract.isWhitelisted(walletAddress);
  if (!whitelisted) {
    throw new Error(`Wallet ${walletAddress} is not KYC-verified on-chain`);
  }

  const partitionHash = ethers.keccak256(ethers.toUtf8Bytes(partition));
  const data = ethers.toUtf8Bytes(paymentRef);

  logger.info("Submitting mintFractional tx", {
    partition,
    walletAddress,
    amount,
    paymentRef,
  });

  const tx = await contract.mintFractional(
    partitionHash,
    walletAddress,
    amount,
    data
  );
  const receipt = await tx.wait();

  logger.info("Minting confirmed", {
    txHash: receipt.hash,
    blockNumber: receipt.blockNumber,
  });

  return { txHash: receipt.hash, blockNumber: receipt.blockNumber };
}

module.exports = { mintAfterPayment };
