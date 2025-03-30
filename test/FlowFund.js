const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("FlowFund", function () {
  let testToken;
  let flowFund;
  let owner;
  let investor1;
  let investor2;
  const initialSupply = ethers.parseEther("1000000"); // 1M tokens
  const investAmount = ethers.parseEther("1000"); // 1000 tokens

  beforeEach(async function () {
    [owner, investor1, investor2] = await ethers.getSigners();

    // Deploy test token
    const TestToken = await ethers.getContractFactory("TestToken");
    testToken = await TestToken.deploy("Test Token", "TEST", initialSupply);
    await testToken.waitForDeployment();

    // Deploy FlowFund contract
    const FlowFund = await ethers.getContractFactory("FlowFund");
    flowFund = await FlowFund.deploy(testToken.target, owner.address); // Owner is also the carry fee recipient
    await flowFund.waitForDeployment();

    // Transfer some tokens to investors
    await testToken.transfer(investor1.address, investAmount * 2n);
    await testToken.transfer(investor2.address, investAmount * 2n);
  });

  describe("Investment", function () {
    it("Should allow investors to invest", async function () {
      await testToken.connect(investor1).approve(flowFund.target, investAmount);
      await flowFund.connect(investor1).invest(investAmount);

      const investorInfo = await flowFund.getInvestorInfo(investor1.address);
      expect(investorInfo[0]).to.equal(investAmount); // totalInvestment
    });

    it("Should track multiple investments correctly", async function () {
      await testToken.connect(investor1).approve(flowFund.target, investAmount * 2n);
      await flowFund.connect(investor1).invest(investAmount);
      await flowFund.connect(investor1).invest(investAmount);

      const investorInfo = await flowFund.getInvestorInfo(investor1.address);
      expect(investorInfo[0]).to.equal(investAmount * 2n); // totalInvestment
    });
  });

  describe("Withdrawal", function () {
    beforeEach(async function () {
      await testToken.connect(investor1).approve(flowFund.target, investAmount);
      await flowFund.connect(investor1).invest(investAmount);
    });

    it("Should allow withdrawal requests", async function () {
      await flowFund.connect(investor1).requestWithdrawal(investAmount);
      const investorInfo = await flowFund.getInvestorInfo(investor1.address);
      expect(investorInfo[4]).to.be.true; // hasActiveWithdrawal
    });

    it("Should process withdrawal after delay", async function () {
      await flowFund.connect(investor1).requestWithdrawal(investAmount);
      await time.increase(time.duration.minutes(10));
      
      await flowFund.connect(owner).processWithdrawal(investor1.address);
      const investorInfo = await flowFund.getInvestorInfo(investor1.address);
      expect(investorInfo[0]).to.equal(0); // totalInvestment should be 0
    });
  });

  describe("Dividends", function () {
    beforeEach(async function () {
      // Two investors invest 1000 tokens each
      await testToken.connect(investor1).approve(flowFund.target, investAmount);
      await testToken.connect(investor2).approve(flowFund.target, investAmount);
      await flowFund.connect(investor1).invest(investAmount);
      await flowFund.connect(investor2).invest(investAmount);

      // Owner transfers 1000 tokens as dividends
      await testToken.approve(flowFund.target, investAmount);
      await testToken.transfer(flowFund.target, investAmount);
    });

    it("Should distribute dividends correctly", async function () {
      await flowFund.connect(owner).distributeDividends();
      
      const investor1Info = await flowFund.getInvestorInfo(investor1.address);
      const investor2Info = await flowFund.getInvestorInfo(investor2.address);

      // Each investor should get 500 tokens as dividends (50% each)
      expect(investor1Info[1]).to.equal(investAmount / 2n); // pendingDividends
      expect(investor2Info[1]).to.equal(investAmount / 2n); // pendingDividends
    });

    it("Should allow claiming dividends with carry fee", async function () {
      await flowFund.connect(owner).distributeDividends();
      const initialBalance = await testToken.balanceOf(investor1.address);
      const initialCarryBalance = await testToken.balanceOf(owner.address);
      const dividendAmount = investAmount / 2n; // 500 tokens
      const carryAmount = (dividendAmount * 1500n) / 10000n; // 15% carry fee
      const netAmount = dividendAmount - carryAmount;

      await flowFund.connect(investor1).claimDividends();

      const finalBalance = await testToken.balanceOf(investor1.address);
      const finalCarryBalance = await testToken.balanceOf(owner.address);

      expect(finalBalance - initialBalance).to.equal(netAmount);
      expect(finalCarryBalance - initialCarryBalance).to.equal(carryAmount);
    });
  });
});
