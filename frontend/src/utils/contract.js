import { ethers } from 'ethers';
import contractABI from '../constants/contractABI.json';

const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

export const getEthereumContract = () => {
    if (typeof window !== 'undefined' && window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();
        return new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
    }
    return null;
};
