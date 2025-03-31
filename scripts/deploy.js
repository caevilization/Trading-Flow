const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy test token for local testing
  const TestToken = await hre.ethers.getContractFactory("TestToken");
  const testToken = await TestToken.deploy(
    "TradingFlow Token ONLY_TEST_USE",
    "TF",
    hre.ethers.parseEther("1000000")
  ); // 1M tokens
  await testToken.waitForDeployment();
  console.log(`TestToken deployed to: ${testToken.target}`);

  // Deploy FlowFund with carry fee address
  const carryAddress = deployer.address; // For testing, use deployer as carry fee recipient
  const FlowFund = await hre.ethers.getContractFactory("FlowFund");
  const flowFund = await FlowFund.deploy(testToken.target, carryAddress);
  await flowFund.waitForDeployment();

  console.log(`FlowFund deployed to: ${flowFund.target}`);
  console.log(`Using token at address: ${testToken.target}`);
  console.log(`Carry fee recipient: ${carryAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
