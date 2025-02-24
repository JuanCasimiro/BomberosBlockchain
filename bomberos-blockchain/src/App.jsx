import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/BomberosPage';
import InfoPage from './pages/InfoPage';
import TeamPage from './pages/TeamPage';
import Navigation from './components/Navigation';
import NotFound from './pages/NotFound'; // Asegúrate de tener este componente
import { requestAccount } from "./utils/contractServices"


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
    }
  };
  
  const openCreateCampaign = () => {
    setIsCreateCampaignOpen(true);
  };

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
                    isCreateCampaignOpen={isCreateCampaignOpen}
                    setIsCreateCampaignOpen={setIsCreateCampaignOpen}
                    />} 
        />
        <Route path="/incendios" element={<InfoPage />} />
        <Route path="/equipo" element={<TeamPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
