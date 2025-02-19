import React, { useState, useEffect, useRef } from "react";
import { FaEthereum, FaFireExtinguisher, FaWallet, FaHandHoldingHeart, FaBars, FaTimes } from "react-icons/fa";
import { ethers } from "ethers";
import { requestAccount} from "../utils/contractServices";

const HomePage = () => {
  const [isWeb3Enabled, setIsWeb3Enabled] = useState(false);
  const [account, setAccount] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const connectWallet = async () => {
    try {
      const account = await requestAccount();
      setAccount(account);

    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      stationName: "Estación 23 - Centro",
      image: "https://images.unsplash.com/photo-1599171571332-3de25555105e",
      goal: 25,
      raised: 15,
      description: "Actualización de equipamiento esencial"
    },
    {
      id: 2,
      stationName: "Estación 45 - Riverside",
      image: "https://images.unsplash.com/photo-1563604437105-d5b760c8a1dd",
      goal: 40,
      raised: 28,
      description: "Financiamiento para nuevo vehículo de rescate"
    },
    {
      id: 3,
      stationName: "Estación 12 - Highland",
      image: "https://images.unsplash.com/photo-1617973097554-506592450d3e",
      goal: 30,
      raised: 20,
      description: "Equipo de respuesta a emergencias"
    }
  ]);

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

  const campaignsRef = useRef(null);

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
        src={campaign.image}
        alt={campaign.stationName}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {campaign.stationName}
        </h3>
        <p className="text-gray-600 mb-4">{campaign.description}</p>
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>{campaign.raised} ETH recaudados</span>
            <span>{campaign.goal} ETH objetivo</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-red-600 rounded-full h-2"
              style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
            ></div>
          </div>
        </div>
        <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center">
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
        <div class="bg-red-500 text-white p-4">Si ves esto en rojo, Tailwind funciona.</div>

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
    </div>
  );
};

export default HomePage;