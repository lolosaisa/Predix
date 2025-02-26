import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";
import "@nomicfoundation/hardhat-ethers";


require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  //enable automatc typescript for smart contracts
  typechain: {
    outDir: "typechain-types",
    target: "ethers-v5",
   },
  networks: {
    //ethereums sepolia testnet
    sepolia: {
      url: `https://eth-sepolia.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [`0x${process.env.WALLET_KEY}`],  // Ensure your private key has 0x prefix
      gasPrice: 1000000000, 
    },
    "lisk-sepolia": {
      url: 'https://rpc.sepolia-api.lisk.com',
      accounts: [`0x${process.env.WALLET_KEY}`],  // Ensure your private key has 0x prefix
      gasPrice: 1000000000, // Only use if required by the Lisk network
    },
  },
  //etherscan for hardhat
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY as string, //etherscan api key for sepolia
      "lisk-sepolia": "123",
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
