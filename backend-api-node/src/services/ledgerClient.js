const logger = require("../config/logger");

const LEDGER_URL = process.env.LEDGER_SERVICE_URL || "http://localhost:8080";

/**
 * Forward an audit event to the Go ledger service.
 */
async function recordAuditEvent(event) {
  try {
    const res = await fetch(`${LEDGER_URL}/api/v1/audit/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });

    if (!res.ok) {
      logger.error("Ledger service returned error", {
        status: res.status,
        body: await res.text(),
      });
    }
  } catch (err) {
    // Non-blocking — minting should not fail because of ledger issues.
    logger.error("Failed to reach ledger service", { error: err.message });
  }
}

module.exports = { recordAuditEvent };
