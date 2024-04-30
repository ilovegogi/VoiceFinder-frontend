import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MarketService from '../../services/MarketService';
import './MarketDetail.css';

function MarketDetail() {
  const { marketId } = useParams();
  const [market, setMarket] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 관리 추가
  const navigate = useNavigate();


  useEffect(() => {
    // 이미 market 데이터가 있거나 로딩 상태가 아니면 요청 중단
    if (!loading || !marketId) return;

    const fetchMarket = async () => {
      try {
        const response = await MarketService.getMarketById(marketId);
        setMarket(response.data); 
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching market:', error);
        setLoading(false); 
      }
    };

    fetchMarket();
  }, [marketId, loading]); // loading 상태도 의존성 배열에 추가

  const handleCreateCampaign = () => {
    if (market && market.id) {
      navigate(`/create-campaign/${market.id}`);
    } else {
      console.error('Market data is not loaded yet');
    }
  };
  

  if (loading) return <div>Loading...</div>; // 로딩 중 표시

  return (
    <div className="market-detail">
      <h2>{market.name}</h2>
      <p>{market.description}</p>
      <button onClick={handleCreateCampaign} style={{ marginBottom: '20px' }}>
        Create Campaign
      </button>
      <div>
        <strong>Category:</strong> {market.category} 
        <p><strong>Address:</strong> {market.address}</p>
        <p><strong>Way to come:</strong> {market.wayDescription}</p>
        <p><strong>Created At:</strong> {new Date(market.createdAt).toLocaleDateString()}</p>
        <p><strong>Modified At:</strong> {new Date(market.modifiedAt).toLocaleDateString()}</p>
      </div>
      {market.imageUrls && market.imageUrls.map((imageUrl, index) => (
        <img
          key={index}
          src={imageUrl}
          alt={`Market ${index}`}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      ))}
    </div>
  );
}

export default MarketDetail;
