import Firefighter_ABI from "./Lock_ABI.json";
import { BrowserProvider, Contract, parseEther, formatEther, ethers } from "ethers";
import { CONTRACT_ADDRESS } from "./constants";

let provider;
let signer;
let contract;

export const initialize = async () => {
  if (typeof window.ethereum !== "undefined") {
    provider = new BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    contract = new Contract(CONTRACT_ADDRESS, Firefighter_ABI, signer);

    await provider.getNetwork().then(network => {
      console.log("Conectado a la red:", network.name);  // Debería decir 'sepolia'
    });
  } else {
    console.error("Please install MetaMask!");
  }
};

// Llamar a `initialize` y esperar a que termine antes de continuar
initialize().then(() => {
  console.log("Web3 inicializado correctamente");
});

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
    return { success: true };
  } catch (error) {
    return { success: false, error: error }
  }
};

export const refund = async (campaignId) => {
  try {
    const tx = await contract.refund(campaignId);
    await tx.wait();
    return { success: true };
  } catch (error) {

    return { success: false, error: error };
  }
};

export const getMintedTokens = async (account) => {
  try {
    const tokenIds = await contract.getMintedTokens(account);
    const tokens = await Promise.all(tokenIds.map(async (tokenId) => {
      const tokenURI = await contract.tokenURI(tokenId);
      const response = await fetch(tokenURI);
      const metadata = await response.json();
      return {
        id: tokenId,
        ...metadata,
      };
    }));
    return tokens;
  } catch (error) {
    console.error("Error getting minted tokens:", error.message);
    return [];
  }
};

// Nueva función para escuchar cambios en la cuenta
export const onAccountChange = (callback) => {
  if (window.ethereum) {
    window.ethereum.on('accountsChanged', callback);
  }
};

// Nueva función para agregar a la whitelist
export const addToWhitelist = async (address) => {
  try {
    const tx = await contract.setWhitelist(address, true);
    await tx.wait();
    return true;
  } catch (error) {
    console.error("Error adding to whitelist:", error.message);
    return false;
  }
};
