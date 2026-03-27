const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("WaqFiFractional", function () {
  let contract, admin, user1, user2, beneficiary;
  const PARTITION = ethers.keccak256(ethers.toUtf8Bytes("test-asset"));

  beforeEach(async function () {
    [admin, user1, user2, beneficiary] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("WaqFiFractional");
    contract = await Factory.deploy(admin.address);
    await contract.waitForDeployment();

    // Register a waqf asset
    await contract.registerWaqfAsset(
      PARTITION,
      "Test Waqf Asset",
      "Jakarta",
      1000,
      beneficiary.address
    );
  });

  describe("Whitelist", function () {
    it("should add and verify whitelisted address", async function () {
      await contract.addToWhitelist(user1.address);
      expect(await contract.isWhitelisted(user1.address)).to.be.true;
    });

    it("should reject non-whitelisted minting", async function () {
      await expect(
        contract.mintFractional(PARTITION, user1.address, 1, "0x")
      ).to.be.revertedWith("WaqFi: address not KYC-verified");
    });
  });

  describe("Minting", function () {
    beforeEach(async function () {
      await contract.addToWhitelist(user1.address);
    });

    it("should mint fractional tokens to whitelisted address", async function () {
      await contract.mintFractional(PARTITION, user1.address, 5, "0x");
      expect(
        await contract.balanceOfByPartition(PARTITION, user1.address)
      ).to.equal(5);
    });

    it("should reject minting below minimum fraction", async function () {
      await expect(
        contract.mintFractional(PARTITION, user1.address, 0, "0x")
      ).to.be.revertedWith("WaqFi: below minimum fraction");
    });

    it("should reject minting beyond target", async function () {
      await expect(
        contract.mintFractional(PARTITION, user1.address, 1001, "0x")
      ).to.be.revertedWith("WaqFi: exceeds target");
    });
  });

  describe("Transfer", function () {
    beforeEach(async function () {
      await contract.addToWhitelist(user1.address);
      await contract.addToWhitelist(user2.address);
      await contract.mintFractional(PARTITION, user1.address, 10, "0x");
    });

    it("should transfer between whitelisted addresses", async function () {
      await contract.transferByPartition(
        PARTITION, user1.address, user2.address, 5, "0x"
      );
      expect(
        await contract.balanceOfByPartition(PARTITION, user1.address)
      ).to.equal(5);
      expect(
        await contract.balanceOfByPartition(PARTITION, user2.address)
      ).to.equal(5);
    });
  });

  describe("ROI Distribution", function () {
    it("should distribute ROI to beneficiary", async function () {
      // Send ETH to contract
      await admin.sendTransaction({
        to: await contract.getAddress(),
        value: ethers.parseEther("1.0"),
      });

      const balBefore = await ethers.provider.getBalance(beneficiary.address);
      await contract.distributeROI(PARTITION);
      const balAfter = await ethers.provider.getBalance(beneficiary.address);

      expect(balAfter - balBefore).to.equal(ethers.parseEther("1.0"));
    });
  });
});
