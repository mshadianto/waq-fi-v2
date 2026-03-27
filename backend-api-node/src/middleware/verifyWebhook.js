const crypto = require("crypto");
const logger = require("../config/logger");

/**
 * Verify Xendit webhook callback token.
 * Xendit sends x-callback-token header that must match our stored secret.
 */
function verifyXenditWebhook(req, res, next) {
  const callbackToken = req.headers["x-callback-token"];
  const expected = process.env.XENDIT_WEBHOOK_TOKEN;

  if (!expected) {
    logger.error("XENDIT_WEBHOOK_TOKEN not configured");
    return res.status(500).json({ error: "Webhook verification not configured" });
  }

  if (!callbackToken || !crypto.timingSafeEqual(
    Buffer.from(callbackToken),
    Buffer.from(expected)
  )) {
    logger.warn("Invalid Xendit webhook token", { ip: req.ip });
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
}

/**
 * Verify Midtrans webhook via server key signature.
 */
function verifyMidtransWebhook(req, res, next) {
  const { order_id, status_code, gross_amount, signature_key } = req.body;
  const serverKey = process.env.MIDTRANS_SERVER_KEY;

  if (!serverKey) {
    logger.error("MIDTRANS_SERVER_KEY not configured");
    return res.status(500).json({ error: "Webhook verification not configured" });
  }

  const payload = order_id + status_code + gross_amount + serverKey;
  const expected = crypto.createHash("sha512").update(payload).digest("hex");

  if (signature_key !== expected) {
    logger.warn("Invalid Midtrans signature", { ip: req.ip });
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
}

module.exports = { verifyXenditWebhook, verifyMidtransWebhook };
