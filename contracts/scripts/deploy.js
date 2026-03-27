const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying WaqFiFractional with account:", deployer.address);

  const WaqFiFractional = await ethers.getContractFactory("WaqFiFractional");
  const contract = await WaqFiFractional.deploy(deployer.address);
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("WaqFiFractional deployed to:", address);

  // Register a sample waqf asset partition
  const partition = ethers.keccak256(ethers.toUtf8Bytes("masjid-al-ikhlas-expansion"));
  const tx = await contract.registerWaqfAsset(
    partition,
    "Masjid Al-Ikhlas Expansion",
    "Jakarta Selatan, DKI Jakarta",
    10000, // 10,000 fractional units (each = Rp 10.000 → target Rp 100.000.000)
    deployer.address // placeholder beneficiary
  );
  await tx.wait();
  console.log("Sample waqf asset registered, partition:", partition);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
