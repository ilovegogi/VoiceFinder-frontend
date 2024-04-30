import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; 
import CampaignService from '../services/CampaignService';


const HomePage = ({currentUser}) => {
  const [recommendedCampaigns, setRecommendedCampaigns] = useState([]);
  useEffect(() => {
    const fetchRecommendCampaigns = async () => {
      const campaigns = await CampaignService.getRecommendedCampaigns();
      setRecommendedCampaigns(campaigns.content);
      console.log(campaigns.content);
    };
    fetchRecommendCampaigns();
  }, []);

  return (
    <div className="container">
      <Link to="/markets/1">
        <header className="header">
          <h1>Biz Page Comming Soon..</h1>
        </header>
      </Link>
      <main className="main">
        <p className="intro">{currentUser}님 환영합니다.</p>
        <div className='recommend-campaign-container'>
          {Array.from(recommendedCampaigns).map((campaign, index) => (
            <div key={index} className='recommend-campaign'>
              <Link to={`/campaigns/${campaign.id}`}>
                <img src={campaign.imageUrls} alt={`Campaign ${index + 1}`} style={{ width: '100%' }} />
                <p>{campaign.title}</p>
                <p style={{fontSize:"small"}}>{campaign.marketName}</p>
              </Link>
            </div>
          ))}
        </div>
      </main>

    </div>
  );
};

export default HomePage;
