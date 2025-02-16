import Lock_ABI from "./Lock_ABI.json";
import { BrowserProvider, Contract, parseEther, formatEther, ethers } from "ethers";
import { CONTRACT_ADDRESS } from "./constants";

// Module-level variables to store provider, signer, and contract
let provider;
let signer;
let contract;
const PRICE = 0.05; // Precio fijo por token

// Function to initialize the provider, signer, and contract
const initialize = async () => {
  if (typeof window.ethereum !== "undefined") {
    provider = new BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    contract = new Contract(CONTRACT_ADDRESS, Lock_ABI, signer);
  } else {
    console.error("Please install MetaMask!");
  }
};

// Initialize once when the module is loaded
initialize();

// Function to request single account
export const requestAccount = async () => {
  try {
    const accounts = await provider.send("eth_requestAccounts", []);
    return accounts[0]; // Return the first account
  } catch (error) {
    console.error("Error requesting account:", error.message);
    return null;
  }
};

// Function to get contract balance in ETH
export const getContractBalanceInETH = async () => {
  const balanceWei = await provider.getBalance(CONTRACT_ADDRESS);
  const balanceEth = formatEther(balanceWei); // Convert Wei to ETH string
  return balanceEth; // Convert ETH string to number
};
// Function to get contract balance in ETH
export const mint = async (mintQuantity) => {
  try {
    const value = ethers.parseEther((PRICE * mintQuantity).toString()); // Precio fijo por token
    const tx = await contract.mintRandom({ value });

    await tx.wait(); 
    setIsMinting(false);
  } catch (error) {
    console.error("Error minting nft:", error.message);
    return null;
  }
};

// Función para obtener el saldo de una cuenta específica en ETH
export const getAccountBalance = async (account) => {
  try {
    const balanceWei = await provider.getBalance(account);
    const balanceEth = formatEther(balanceWei);
    return balanceEth; // Devolver el balance en ETH
  } catch (error) {
    console.error("Error getting account balance:", error.message);
    return null;
  }
};

// Function to deposit funds to the contract
export const depositFund = async (depositValue) => {
  const ethValue = parseEther(depositValue);
  const deposit = await contract.deposit({ value: ethValue });
  await deposit.wait();
};

// Function to withdraw funds from the contract
export const withdrawFund = async () => {
  const withdrawTx = await contract.withdraw();
  await withdrawTx.wait();
  console.log("Withdrawal successful!");
};

// Función para obtener los IDs de los NFTs minteados
export const getMintedTokens = async () => {
  try {
    const mintedTokens = await contract.getMintedTokens();
    return mintedTokens;
  } catch (error) {
    console.error("Error getting minted tokens:", error.message);
    return [];
  }
};