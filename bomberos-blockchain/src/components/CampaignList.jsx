import React, { useEffect, useState } from "react";
import CampaignCard from "./CampaignCard";
import { getCampaign, getCampaigns, isWeb3Connected, initialize } from "../utils/contractServices";
import { FaSpinner } from "react-icons/fa";

const CampaignList = ({ account, openModal }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCampaigns = async () => {
      console.log("Account changed:", account);
      try {
        if (account && !isWeb3Connected()) {
          await initialize(); // Solo inicializa si aún no está conectado
        }
        if (isWeb3Connected()) {
          const campaignIds = await getCampaigns();
          const campaignData = await Promise.all(campaignIds.map(id => getCampaign(id)));
          setCampaigns(campaignData);
        } else {
          console.error("Web3 provider or contract not initialized");
        }
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchCampaigns();
  }, [account]);

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
        Campañas Activas
      </h2>
      <input
        type="text"
        placeholder="Buscar por título"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
      />
      {campaigns.length == 0 ? (
        <div className="flex justify-center items-center">
          <FaSpinner className="animate-spin mr-2 text-gray-500" />
          <p className="text-center text-gray-500">Cargando campañas... Asegúrate de tener tu Wallet conectada...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} openModal={openModal} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CampaignList;