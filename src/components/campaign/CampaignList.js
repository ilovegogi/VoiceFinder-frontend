import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import CampaignService from '../../services/CampaignService';
import Pagination from '../Pagination';
import './CampaignList.css'; // Ensure you import the CSS file

function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [campaignsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [isAsc, setIsAsc] = useState(true);

  const fetchCampaigns = useCallback(async () => {
    const response = await CampaignService.getCampaigns(currentPage, campaignsPerPage, sortBy, isAsc, searchTerm);
    setCampaigns(response.content);
    setTotalPages(response.totalPages);
  }, [currentPage, campaignsPerPage, sortBy, isAsc, searchTerm]);
  
  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchCampaigns();
  };

  return (
    <div className="campaign-list-container">
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search Campaigns" />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="createdAt">Date</option>
          <option value="title">Title</option>
        </select>
        <select value={isAsc ? 'asc' : 'desc'} onChange={(e) => setIsAsc(e.target.value === 'asc')}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <button type="submit">Search</button>
      </form>

      <div className="campaign-grid">
        {campaigns.map((campaign, index) => (
          <Link to={`/campaigns/${campaign.id}`} key={campaign.id} className="campaign-card">
            <img src={campaign.imageUrls[0] || 'path/to/defaultImage.png'} alt="Campaign" />
            <div className="campaign-info">
              {(currentPage - 1) * campaignsPerPage + index + 1}. {campaign.marketName}
              <div>{campaign.title}</div>
            </div>
          </Link>
        ))}
      </div>



      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}

export default CampaignList;
