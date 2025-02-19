const { ethers } = require('ethers');
require('dotenv').config();
const contractABI = require('../constants/contractABI.json');

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, wallet);

module.exports = contract;
