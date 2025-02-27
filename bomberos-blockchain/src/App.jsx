import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/BomberosPage';
import InfoPage from './pages/InfoPage';
import TeamPage from './pages/TeamPage';
import NFTPage from './pages/NFTpage'; // Importa la nueva página de NFTs
import Navigation from './components/Navigation';
import NotFound from './pages/NotFound'; // Asegúrate de tener este componente
import { requestAccount, onAccountChange } from "./utils/contractServices";

function App() {
  const [account, setAccount] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCreateCampaignOpen, setIsCreateCampaignOpen] = useState(false);

  const connectWallet = async () => {
    try {
      const account = await requestAccount();
      setAccount(account);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      toast.error("Failed to connect wallet");
    }
  };

  const openCreateCampaign = () => {
    setIsCreateCampaignOpen(true);
  };

  useEffect(() => {
    const checkAccount = async () => {
      try {
        const account = await requestAccount();
        if (account) {
          setAccount(account);
        }
      } catch (error) {
        console.error("Failed to check account:", error);
        toast.error("Failed to check account");
      }
    };

    checkAccount();

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        setAccount(null);
      } else {
        setAccount(accounts[0]);
      }
    };

    onAccountChange(handleAccountsChanged);

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  return (
    <Router>
      <Navigation 
        connectWallet={connectWallet} 
        account={account} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        openCreateCampaign={openCreateCampaign}
      />
      <Routes>
        <Route 
          path="/" 
          element={<HomePage
                    account={account}
                    isCreateCampaignOpen={isCreateCampaignOpen}
                    setIsCreateCampaignOpen={setIsCreateCampaignOpen}
                    />} 
        />
        <Route path="/incendios" element={<InfoPage />} />
        <Route path="/equipo" element={<TeamPage />} />
        <Route path="/nfts" element={<NFTPage account={account} />} /> {/* Nueva ruta para la página de NFTs */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
