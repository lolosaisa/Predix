const hre = require("hardhat");

async function main() {
  const MyContract = await hre.ethers.getContractFactory("MyContract");
  const myContract = await MyContract.deploy();
  await myContract.waitForDeployment();
  console.log("Contract deployed to:", await myContract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
