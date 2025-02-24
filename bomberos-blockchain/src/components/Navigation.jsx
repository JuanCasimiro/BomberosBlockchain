import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navigation = ({ connectWallet, account, isMenuOpen, setIsMenuOpen, openCreateCampaign }) => (
  <nav className="bg-gray-900 fixed w-full z-50 top-0 shadow-md">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <span className="text-white text-xl font-bold">IncendiAR</span>
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 ml-8">
            <Link to="/" className="text-white hover:text-blue-500">Home</Link>
            <Link to="/incendios" className="text-white hover:text-blue-500">Incendios</Link>
            <Link to="/equipo" className="text-white hover:text-blue-500">Equipo</Link>
          </div>
        </div>
        <div className="flex items-center space-x-8">
          <button
            onClick={openCreateCampaign}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Crear Campaña
          </button>
          <button
            onClick={connectWallet}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Conectar Billetera"}
          </button>
        </div>
        {/* Mobile Menu Button */}
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
    {/* Mobile Navigation Links */}
    {isMenuOpen && (
      <div className="md:hidden bg-gray-900 p-4 space-y-4">
        <button
          onClick={openCreateCampaign}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Crear Campaña
        </button>
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

export default Navigation;
