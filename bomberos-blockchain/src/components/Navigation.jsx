import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { onAccountChange, addToWhitelist } from '../utils/contractServices';

const Navigation = ({ connectWallet, account, isMenuOpen, setIsMenuOpen, openCreateCampaign }) => {
  const [isWhitelistModalOpen, setIsWhitelistModalOpen] = useState(false);
  const [whitelistAddress, setWhitelistAddress] = useState("");
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const adminMenuRef = useRef(null);

  const handleAddToWhitelist = async () => {
    const success = await addToWhitelist(whitelistAddress);
    if (success) {
      toast.success("Dirección añadida a la whitelist con éxito");
      setWhitelistAddress("");
      setIsWhitelistModalOpen(false);
    } else {
      toast.error("Error al añadir la dirección a la whitelist");
    }
  };

  const handleClickOutside = (event) => {
    if (adminMenuRef.current && !adminMenuRef.current.contains(event.target)) {
      setIsAdminMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-900 fixed w-full z-50 top-0 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white text-xl font-bold">IncendiAR</Link>
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8 ml-8">
              <Link to="/" className="text-white hover:text-blue-500">Home</Link>
              <Link to="/incendios" className="text-white hover:text-blue-500">Incendios</Link>
              <Link to="/equipo" className="text-white hover:text-blue-500">Equipo</Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative" ref={adminMenuRef}>
              <button
                onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <FaUserCircle className="mr-2" /> Admin
              </button>
              {isAdminMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                  <button
                    onClick={openCreateCampaign}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Crear Campaña
                  </button>
                  <button
                    onClick={() => setIsWhitelistModalOpen(true)}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Añadir a Whitelist
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={connectWallet}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center"
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
          <Link to="/" className="block text-white hover:text-blue-500" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/incendios" className="block text-white hover:text-blue-500" onClick={() => setIsMenuOpen(false)}>Incendios</Link>
          <Link to="/equipo" className="block text-white hover:text-blue-500" onClick={() => setIsMenuOpen(false)}>Equipo</Link>
          <div className="relative">
            <button
              onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center justify-center"
            >
              <FaUserCircle className="mr-2" /> Admin
            </button>
            {isAdminMenuOpen && (
              <div className="mt-2 w-full bg-white rounded-lg shadow-lg py-2">
                <button
                  onClick={openCreateCampaign}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Crear Campaña
                </button>
                <button
                  onClick={() => setIsWhitelistModalOpen(true)}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Añadir a Whitelist
                </button>
              </div>
            )}
          </div>
          <button
            onClick={connectWallet}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center justify-center"
          >
            {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Conectar Billetera"}
          </button>
        </div>
      )}

      {/* Whitelist Modal */}
      {isWhitelistModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Añadir a Whitelist</h2>
            <input
              type="text"
              placeholder="Dirección de Ethereum"
              value={whitelistAddress}
              onChange={(e) => setWhitelistAddress(e.target.value)}
              className="w-full p-2 mb-2 border rounded"
              required
            />
            <div className="flex justify-between">
              <button
                onClick={handleAddToWhitelist}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
              >
                Añadir
              </button>
              <button
                onClick={() => setIsWhitelistModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-lg"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
