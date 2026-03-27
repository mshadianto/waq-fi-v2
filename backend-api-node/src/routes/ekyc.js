const { Router } = require("express");
const { getContract } = require("../config/blockchain");
const { recordAuditEvent } = require("../services/ledgerClient");
const logger = require("../config/logger");

const router = Router();

/**
 * POST /api/v1/ekyc/verify
 *
 * Called after VIDA/PrivyID e-KYC verification succeeds.
 * Whitelists the wallet address on the smart contract so it can receive tokens.
 *
 * Body: { walletAddress, provider ("vida"|"privyid"), verificationId }
 */
router.post("/verify", async (req, res) => {
  const { walletAddress, provider, verificationId } = req.body;

  if (!walletAddress || !provider || !verificationId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const contract = getContract();
    if (!contract) {
      return res.status(503).json({ error: "Blockchain service unavailable" });
    }

    // Check if already whitelisted
    const already = await contract.isWhitelisted(walletAddress);
    if (already) {
      return res.json({ status: "already_whitelisted", walletAddress });
    }

    const tx = await contract.addToWhitelist(walletAddress);
    await tx.wait();

    logger.info("Wallet whitelisted after e-KYC", {
      walletAddress,
      provider,
      verificationId,
      txHash: tx.hash,
    });

    recordAuditEvent({
      type: "KYC_WHITELIST",
      walletAddress,
      provider,
      verificationId,
      txHash: tx.hash,
      timestamp: new Date().toISOString(),
    });

    return res.json({ status: "whitelisted", walletAddress, txHash: tx.hash });
  } catch (err) {
    logger.error("e-KYC whitelist failed", { error: err.message, walletAddress });
    return res.status(500).json({ error: "Whitelisting failed" });
  }
});

module.exports = router;
