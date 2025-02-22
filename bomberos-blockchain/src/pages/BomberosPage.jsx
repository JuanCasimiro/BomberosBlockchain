import React, { useState, useEffect, useRef } from "react";
import { FaEthereum, FaFireExtinguisher, FaWallet, FaHandHoldingHeart, FaBars, FaTimes } from "react-icons/fa";
import { ethers } from "ethers";
import { requestAccount, getCampaign, getCampaigns, contribute, refund} from "../utils/contractServices";

const HomePage = () => {
  const [isWeb3Enabled, setIsWeb3Enabled] = useState(false);
  const [account, setAccount] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const campaignsRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState(null);


  const connectWallet = async () => {
    try {
      const account = await requestAccount();
      setAccount(account);

    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const campaignDataHardcode = [
    {
      id: 1,
      title: "Estación 23 - Centro",
      description: "Actualización de equipamiento esencial",
      goal: 25,
      fundsRaised: 15,
      deadline: 1678000000, // Usar una fecha en formato UNIX
      withdrawn: false,
      image: "https://images.unsplash.com/photo-1599171571332-3de25555105e" // Imagen de ejemplo
    },
    {
      id: 2,
      title: "Estación 45 - Riverside",
      description: "Financiamiento para nuevo vehículo de rescate",
      goal: 40,
      fundsRaised: 28,
      deadline: 1679000000,
      withdrawn: false,
      image: "https://images.unsplash.com/photo-1563604437105-d5b760c8a1dd"
    },
    {
      id: 3,
      title: "Estación 12 - Highland",
      description: "Equipo de respuesta a emergencias",
      goal: 30,
      fundsRaised: 20,
      deadline: 1680000000,
      withdrawn: false,
      image: "https://images.unsplash.com/photo-1617973097554-506592450d3e"
    }
  ];  

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const campaignIds = await getCampaigns();
        const campaignData = await Promise.all(campaignIds.map(id => getCampaign(id)));
        setCampaigns(campaignData);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    //fetchCampaigns();

    setCampaigns(campaignDataHardcode);
  }, []);

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
  

  const Navigation = () => (
    <nav className="bg-gray-900 fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-white text-xl font-bold">FireFund</span>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <button
                onClick={connectWallet}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center"
              >
                {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Conectar Billetera"}
              </button>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 p-4">
          <button
            onClick={connectWallet}
            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center justify-center"
          >
            {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Conectar Billetera"}
          </button>
        </div>
      )}
    </nav>
  );

  const scrollToCampaigns = () => {
    campaignsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const HeroSection = () => (
    <div className="relative bg-gray-900 py-32 mt-16">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1578255321055-d9ed6a976af5"
          alt="Fondo de Bomberos"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Apoye a Nuestros Bomberos
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          Ayude a los bomberos de Argentina a obtener el equipamiento necesario para salvar vidas
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105">
            Donar Ahora
          </button>
          <button 
            onClick={scrollToCampaigns}
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105">
            Ver Campañas
          </button>
        </div>
      </div>
    </div>
  );

  const CampaignCard = ({ campaign }) => (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl">
      <img
        src={campaign.image || "https://via.placeholder.com/300"} // Agrega una imagen por defecto si no hay imagen
        alt={campaign.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {campaign.title}
        </h3>
        <p className="text-gray-600 mb-4">{campaign.description}</p>
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>{campaign.fundsRaised} ETH recaudados</span>
            <span>{campaign.goal} ETH objetivo</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-red-600 rounded-full h-2"
              style={{ width: `${(campaign.fundsRaised / campaign.goal) * 100}%` }}
            ></div>
          </div>
        </div>
        <button
          onClick={() => openModal(campaign)} // Usar openModal con la campaña completa
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center"
        >
          <FaEthereum className="mr-2" /> Donar Ahora
        </button>
      </div>
    </div>
  );
  

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

      <Navigation />
      <HeroSection />
      <div ref={campaignsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Campañas Activas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
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
    </div>
  );
};

export default HomePage;