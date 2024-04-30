import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/Home';
import BizPage from './components/Biz';
import LoginPage from './components/user/LoginPage';
import SignupPage from './components/user/SignupPage';
import AuthService from './services/AuthService';
import Navbar from './Navbar';
import UserProfile from './components/user/UserProfile';
import CampaignDetail from './components/campaign/CampaignDetail';
import CampaignList from './components/campaign/CampaignList';
import CampaignForm from './components/campaign/CampaignForm';
import MarketDetail from './components/market/MarketDetail';
import MarketList from './components/market/MarketList';
import MarketForm from './components/market/MarketForm';


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userInfo = await AuthService.getCurrentUser();
        if (userInfo && userInfo.username) {
          setCurrentUser(userInfo);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchCurrentUser();
  }, []);

  const handleLogout = () => {
    AuthService.logout(); 
    setCurrentUser(null);
  };

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중 표시
  }

  return (
    <BrowserRouter>
      <div className="app-container"> 
        <Navbar currentUser={currentUser} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<HomePage currentUser={currentUser.username}/>} />
          <Route path="/biz" element={<BizPage currentUser={currentUser.username}/>} />


          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<UserProfile />} />

          <Route path="/campaigns" element={<CampaignList />} />
          <Route path="/campaigns/:campaignId" element={<CampaignDetail />} />
          <Route path="/create-campaign/:marketId" element={<CampaignForm editMode={false} />} />

          <Route path="/markets" element={<MarketList />} />
          <Route path="/markets/:marketId" element={<MarketDetail />} />
          <Route path="/create-market" element={<MarketForm editMode={false} />} />

        </Routes>
      </div>
      <footer className="footer">
        © 2024 VoiceFinder. All rights reserved.
      </footer>

    </BrowserRouter>
  );
}

export default App;
