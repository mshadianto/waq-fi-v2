require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const logger = require("./config/logger");

const paymentWebhook = require("./routes/paymentWebhook");
const ekycRoutes = require("./routes/ekyc");
const assetRoutes = require("./routes/assets");

const app = express();

// ── Security middleware ──
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json({ limit: "1mb" }));
app.use(
  rateLimit({
    windowMs: 60_000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// ── Routes ──
app.use("/webhook", paymentWebhook);
app.use("/api/v1/ekyc", ekycRoutes);
app.use("/api/v1/assets", assetRoutes);

// Health check
app.get("/health", (_req, res) => res.json({ status: "ok" }));

// ── Global error handler ──
app.use((err, _req, res, _next) => {
  logger.error("Unhandled error", { error: err.message, stack: err.stack });
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => logger.info(`WaqFi API Gateway listening on :${PORT}`));

module.exports = app;
