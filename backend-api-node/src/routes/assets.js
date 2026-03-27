const { Router } = require("express");
const { getContract } = require("../config/blockchain");
const logger = require("../config/logger");

const router = Router();

/**
 * GET /api/v1/assets
 *
 * Returns all registered waqf asset partitions with funding progress.
 */
router.get("/", async (_req, res) => {
  try {
    const contract = getContract();
    if (!contract) {
      return res.status(503).json({ error: "Blockchain service unavailable" });
    }

    const partitions = await contract.totalPartitions();
    const assets = await Promise.all(
      partitions.map(async (p) => {
        const asset = await contract.waqfAssets(p);
        const supply = await contract.totalSupplyByPartition(p);
        return {
          partition: p,
          name: asset.name,
          location: asset.location,
          targetAmount: Number(asset.targetAmount),
          raisedAmount: Number(asset.raisedAmount),
          mauqufAlaih: asset.mauqufAlaih,
          fullyFunded: asset.fullyFunded,
          totalSupply: Number(supply),
          progressPercent:
            asset.targetAmount > 0
              ? Math.round(
                  (Number(asset.raisedAmount) / Number(asset.targetAmount)) * 100
                )
              : 0,
        };
      })
    );

    return res.json({ assets });
  } catch (err) {
    logger.error("Failed to fetch assets", { error: err.message });
    return res.status(500).json({ error: "Failed to fetch assets" });
  }
});

module.exports = router;
