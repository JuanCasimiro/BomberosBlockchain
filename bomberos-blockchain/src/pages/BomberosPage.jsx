import React, { useState, useEffect, useRef } from "react";
import { FaEthereum, FaFireExtinguisher, FaWallet, FaHandHoldingHeart, FaBars, FaTimes } from "react-icons/fa";
import { ethers } from "ethers";
import CampaignCard from "../components/CampaignCard";
import { requestAccount, getCampaign, getCampaigns, contribute, refund, createCampaign, isWeb3Connected } from "../utils/contractServices";
import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import CreateCampaignPanel from "../components/CreateCampaignPanel"; // Import the CreateCampaignPanel component

const HomePage = ({ isCreateCampaignOpen, setIsCreateCampaignOpen }) => {
  const [campaigns, setCampaigns] = useState([]);
  const campaignsRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState(null); // New state for create campaign panel

  const campaignDataHardcode = [
    {
      title: "Estación 23 - Centro",
      description: "Actualización de equipamiento esencial",
      goal: 25,
      fundsRaised: 15,
      deadline: 1678000000, // Usar una fecha en formato UNIX
      withdrawn: false,
      image: "https://images.unsplash.com/photo-1599171571332-3de25555105e" // Imagen de ejemplo
    },
    {
      title: "Estación 45 - Riverside",
      description: "Financiamiento para nuevo vehículo de rescate",
      goal: 40,
      fundsRaised: 28,
      deadline: 1733100800,
      withdrawn: false,
      image: "https://images.unsplash.com/photo-1563604437105-d5b760c8a1dd"
    },
    {
      title: "Estación 12 - Highland",
      description: "Equipo de respuesta a emergencias",
      goal: 30,
      fundsRaised: 20,
      deadline: 1750100800,
      withdrawn: false,
      image: "https://images.unsplash.com/photo-1617973097554-506592450d3e"
    }
  ];  

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        if (isWeb3Connected()) {
          let campaignIds = await getCampaigns();
          campaignIds = campaignIds.map(id => Number(id));
          console.log(campaignIds);
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
  
    //setCampaigns(campaignDataHardcode);
  }, [isWeb3Connected()]);

  const handleRefund = async (campaignId) => {
    const success = await refund(campaignId);
    if (success) {
      alert("Reembolso solicitado con éxito");
    } else {
      alert("Error en la solicitud de reembolso");
    }
  };

  const handleContribute = async (campaignId, amount) => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Ingresa una cantidad válida de ETH");
      return;
    }
    const success = await contribute(campaignId, amount);
    if (success) {
      alert("Contribución realizada con éxito");
    } else {
      alert("Error en la contribución");
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

  const HowItWorks = () => (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Cómo Funciona
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaWallet className="text-2xl text-red-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Conecta tu Billetera</h3>
            <p className="text-gray-600">Conecta tu billetera MetaMask para comenzar</p>
          </div>
          <div className="text-center">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaFireExtinguisher className="text-2xl text-red-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Elige una Campaña</h3>
            <p className="text-gray-600">Selecciona una estación de bomberos para apoyar</p>
          </div>
          <div className="text-center">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHandHoldingHeart className="text-2xl text-red-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Marca la Diferencia</h3>
            <p className="text-gray-600">Contribuye con ETH para ayudar a salvar vidas</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection scrollToCampaigns={scrollToCampaigns} />
      <div ref={campaignsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Campañas Activas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign, index) => (
            <CampaignCard key={index} campaign={campaign} openModal={openModal} />
          ))}
        </div>
      </div>
      <HowItWorks />

      {isModalOpen && selectedCampaign && (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h3 className="text-xl font-bold mb-4">Donar a {selectedCampaign.stationName}</h3>
          <input
            type="number"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            placeholder="Ingresa la cantidad (ETH)"
          />
          <div className="flex justify-between">
            <button
              onClick={() => handleContribute(selectedCampaign.id, donationAmount)}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
            >
              Contribuir
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-lg"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
      )}

      {isCreateCampaignOpen && (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <CreateCampaignPanel createCampaign={createCampaign} />
          <button
            onClick={closeCreateCampaign}
            className="mt-4 bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-lg w-full"
          >
            Cerrar
          </button>
        </div>
      </div>
      )}
    </div>
  );
};

export default HomePage;