import React, { useState, useRef } from "react";
import { FaWallet, FaFireExtinguisher, FaHandHoldingHeart } from "react-icons/fa";
import CampaignList from "../components/CampaignList";
import { contribute, refund, createCampaign } from "../utils/contractServices";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import DonationModal from "../components/DonationModal";
import CreateCampaignModal from "../components/CreateCampaignModal";

const HomePage = ({ account, isCreateCampaignOpen, setIsCreateCampaignOpen }) => {
  const campaignsRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState(null);

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
      <div ref={campaignsRef}>
        <CampaignList account={account} openModal={openModal} />
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