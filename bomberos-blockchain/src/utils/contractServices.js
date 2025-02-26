import Firefighter_ABI from "./Lock_ABI.json";
import { BrowserProvider, Contract, parseEther, formatEther, ethers } from "ethers";
import { CONTRACT_ADDRESS } from "./constants";

let provider;
let signer;
let contract;

const initialize = async () => {
  if (typeof window.ethereum !== "undefined") {
    provider = new BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    contract = new Contract(CONTRACT_ADDRESS, Firefighter_ABI, signer);
  } else {
    console.error("Please install MetaMask!");
  }
  provider.getNetwork().then(network => {
    console.log("Conectado a la red:", network.name);  // Debería decir 'sepolia'
  });
};

initialize();

export const isWeb3Connected = () => {
  return provider && contract;
};

export const requestAccount = async () => {
  try {
    const accounts = await provider.send("eth_requestAccounts", []);
    return accounts[0];
  } catch (error) {
    console.error("Error requesting account:", error.message);
    return null;
  }
};

export const createCampaign = async (title, description, goal, duration) => {
  try {
    const tx = await contract.createCampaign(title, description, parseEther(goal), duration);
    await tx.wait();
    return true;
  } catch (error) {
    console.error("Error creating campaign:", error.message);
    return false;
  }
};

export const contribute = async (campaignId, amount) => {
  try {
    const tx = await contract.contribute(campaignId, { value: parseEther(amount) });
    await tx.wait();
    return true;
  } catch (error) {
    console.error("Error contributing:", error.message);
    return false;
  }
};

export const getCampaign = async (campaignId) => {
  try {
    const campaign = await contract.getCampaign(campaignId);
    console.log("Campaign:", campaign);

    return {
      id: campaign[0],
      creator: campaign[1],
      title: campaign[2],
      description: campaign[3],
      goal: formatEther(campaign[4]),
      deadline: campaign[5], // No es necesario verificar si es BigNumber
      fundsRaised: formatEther(campaign[6]),
      withdrawn: campaign[7],
    };
  } catch (error) {
    console.error("Error getting campaign:", error.message);
    return null;
  }
};

export const getCampaigns = async () => {
  try {
    const campaignIds = Array.from(await contract.getCampaigns()); // Llamada a la función del contrato
    console.log("Campaigns:", campaignIds);
    return campaignIds;
  } catch (error) {
    console.error("Error getting campaigns:", error.message);
    return [];
  }
};

export const withdrawFunds = async (campaignId) => {
  try {
    const tx = await contract.withdrawFunds(campaignId);
    await tx.wait();
    return true;
  } catch (error) {
    console.error("Error withdrawing funds:", error.message);
    return false;
  }
};

export const refund = async (campaignId) => {
  try {
    const tx = await contract.refund(campaignId);
    await tx.wait();
    return true;
  } catch (error) {
    console.error("Error requesting refund:", error.message);
    return false;
  }
};

export const getMintedTokens = async () => {
  try {
    const mintedTokens = await contract.getMintedTokens();
    return mintedTokens;
  } catch (error) {
    console.error("Error getting minted tokens:", error.message);
    return [];
  }
};
