import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";
import "@nomicfoundation/hardhat-ethers";

require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  typechain: {
    outDir: "typechain-types",
    target: "ethers-v6",
  },
  networks: {
    // Ethereum Sepolia Testnet with updated Alchemy URL
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`, // Updated Alchemy API URL
      accounts: [process.env.WALLET_KEY as string], // Private key of the deployer wallet
      gasPrice: 1000000000, // Optional: Set gas price
    },
    // Lisk Sepolia Testnet
    "lisk-sepolia": {
      url: "https://rpc.sepolia-api.lisk.com",
      accounts: [process.env.WALLET_KEY as string], // Private key of the deployer wallet
      gasPrice: 1000000000, // Optional: Set gas price
    },
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY as string, // Etherscan API key for Ethereum Sepolia
      "lisk-sepolia": "123", // Placeholder API key for Lisk Blockscout
    },
    customChains: [
      {
        network: "lisk-sepolia",
        chainId: 4202,
        urls: {
          apiURL: "https://sepolia-blockscout.lisk.com/api",
          browserURL: "https://sepolia-blockscout.lisk.com",
        },
      },
    ],
  },
  sourcify: {
    enabled: false
  },
};

export default config;
