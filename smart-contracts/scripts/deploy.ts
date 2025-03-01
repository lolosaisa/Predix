//for javascript
//const hre = require("hardhat");


//when using TypeScript with Hardhat, we can directly import ethers from "hardhat", which provides access to Hardhat's built-in ethers library.
import { ethers } from "hardhat";

async function main() {
  // Deploy PredixPolls
  const PredixPolls = await ethers.getContractFactory("PredixPolls");
  console.log("Deploying PredixPolls...");
  const predixPolls = await PredixPolls.deploy();
  await predixPolls.waitForDeployment();
  console.log("PredixPolls deployed to:", await predixPolls.getAddress());

  // Deploy PredixMarkets
  const PredixMarkets = await ethers.getContractFactory("PredixMarkets");
  console.log("Deploying PredixMarkets...");
  const predixMarkets = await PredixMarkets.deploy();
  await predixMarkets.waitForDeployment();
  console.log("PredixMarkets deployed to:", await predixMarkets.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
