const { Router } = require("express");
const { verifyXenditWebhook, verifyMidtransWebhook } = require("../middleware/verifyWebhook");
const { mintAfterPayment } = require("../services/mintingService");
const { recordAuditEvent } = require("../services/ledgerClient");
const logger = require("../config/logger");

const router = Router();

/**
 * POST /webhook/payment/xendit
 *
 * Receives Xendit payment-success callback.
 * Expected body: { external_id, status, amount, metadata: { partition, walletAddress } }
 */
router.post("/payment/xendit", verifyXenditWebhook, async (req, res) => {
  const { external_id, status, amount, metadata } = req.body;

  if (status !== "PAID") {
    logger.info("Xendit callback ignored (not PAID)", { external_id, status });
    return res.json({ received: true });
  }

  try {
    const { partition, walletAddress } = metadata;
    const fractions = Math.floor(amount / 10_000); // Rp 10.000 per fraction

    if (fractions < 1) {
      logger.warn("Payment below minimum fraction", { amount, external_id });
      return res.status(400).json({ error: "Below minimum participation" });
    }

    const result = await mintAfterPayment(
      partition,
      walletAddress,
      fractions,
      external_id
    );

    // Record to GRC audit ledger (non-blocking)
    recordAuditEvent({
      type: "MINT",
      source: "xendit",
      paymentRef: external_id,
      walletAddress,
      partition,
      fractions,
      txHash: result.txHash,
      timestamp: new Date().toISOString(),
    });

    return res.json({ received: true, txHash: result.txHash });
  } catch (err) {
    logger.error("Xendit webhook processing failed", {
      error: err.message,
      external_id,
    });
    return res.status(500).json({ error: "Minting failed" });
  }
});

/**
 * POST /webhook/payment/midtrans
 *
 * Receives Midtrans payment notification.
 */
router.post("/payment/midtrans", verifyMidtransWebhook, async (req, res) => {
  const { order_id, transaction_status, gross_amount, custom_field1, custom_field2 } = req.body;

  if (transaction_status !== "settlement" && transaction_status !== "capture") {
    logger.info("Midtrans callback ignored", { order_id, transaction_status });
    return res.json({ received: true });
  }

  try {
    const partition = custom_field1;    // partition name
    const walletAddress = custom_field2; // recipient wallet
    const fractions = Math.floor(parseFloat(gross_amount) / 10_000);

    if (fractions < 1) {
      return res.status(400).json({ error: "Below minimum participation" });
    }

    const result = await mintAfterPayment(partition, walletAddress, fractions, order_id);

    recordAuditEvent({
      type: "MINT",
      source: "midtrans",
      paymentRef: order_id,
      walletAddress,
      partition,
      fractions,
      txHash: result.txHash,
      timestamp: new Date().toISOString(),
    });

    return res.json({ received: true, txHash: result.txHash });
  } catch (err) {
    logger.error("Midtrans webhook processing failed", {
      error: err.message,
      order_id,
    });
    return res.status(500).json({ error: "Minting failed" });
  }
});

module.exports = router;
