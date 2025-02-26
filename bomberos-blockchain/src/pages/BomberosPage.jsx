import React, { useState, useEffect, useRef } from "react";
import { FaWallet, FaFireExtinguisher, FaHandHoldingHeart } from "react-icons/fa";
import CampaignCard from "../components/CampaignCard";
import { getCampaign, getCampaigns, contribute, refund, createCampaign, isWeb3Connected, initialize} from "../utils/contractServices";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import DonationModal from "../components/DonationModal";
import CreateCampaignModal from "../components/CreateCampaignModal";

const HomePage = ({ account, isCreateCampaignOpen, setIsCreateCampaignOpen }) => {
  const [campaigns, setCampaigns] = useState([]);
  const campaignsRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState(null);

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

  const handleRefund = async (campaignId) => {
    try {
      const success = await refund(campaignId);
      if (success) {
        alert("Reembolso solicitado con éxito");
      } else {
        alert("Error en la solicitud de reembolso");
      }
    } catch (error) {
      console.error("Error en la solicitud de reembolso:", error);
    }
  };

  const handleContribute = async (campaignId, amount) => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Ingresa una cantidad válida de ETH");
      return;
    }
    try {
      const success = await contribute(campaignId, amount);
      if (success) {
        alert("Contribución realizada con éxito");
      } else {
        alert("Error en la contribución");
      }
    } catch (error) {
      console.error("Error en la contribución:", error);
    }
  };

  const openModal = (campaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDonationAmount("");
  };

  const closeCreateCampaign = () => {
    setIsCreateCampaignOpen(false);
  };

  const scrollToCampaigns = () => {
    campaignsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection scrollToCampaigns={scrollToCampaigns} />
      <div ref={campaignsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Campañas Activas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} openModal={openModal} />
          ))}
        </div>
      </div>
      <HowItWorks />

      {isModalOpen && selectedCampaign && (
        <DonationModal
          selectedCampaign={selectedCampaign}
          donationAmount={donationAmount}
          setDonationAmount={setDonationAmount}
          handleContribute={handleContribute}
          closeModal={closeModal}
        />
      )}

      {isCreateCampaignOpen && (
        <CreateCampaignModal
          createCampaign={createCampaign}
          closeCreateCampaign={closeCreateCampaign}
        />
      )}
    </div>
  );
};

export default HomePage;