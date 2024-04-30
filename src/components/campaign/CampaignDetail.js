import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CampaignService from '../../services/CampaignService';
import './CampaignDetail.css';  

function CampaignDetail() {
  const { campaignId } = useParams();
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await CampaignService.getCampaignById(campaignId);
        setCampaign(response); 
      } catch (error) {
        console.error('Error fetching campaign:', error);
      }
    };

    fetchCampaign();
  }, [campaignId]);

  if (!campaign) return <div>Loading...</div>;

  return (
    <div className="campaign-detail">
      <h1>{campaign.title}</h1>
      <h2>Market: {campaign.marketName}</h2>
      <p><strong>주소:</strong> {campaign.address}</p>
      <p><strong>Keyword:</strong> {campaign.keyword}</p>
      <p><strong>Description</strong></p>
      <p>{campaign.description}</p>
      <div>
        {campaign.imageUrls && campaign.imageUrls.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt={`Campaign ${index}`} />
        ))}
      </div>
    </div>
  );
}

export default CampaignDetail;
