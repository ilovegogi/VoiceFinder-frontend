import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MarketService from '../../services/MarketService';
import './MarketList.css';
import Pagination from '../Pagination';

function MarketList() {
  const [markets, setMarkets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [marketsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [isAsc, setIsAsc] = useState(true);
  const navigate = useNavigate();

  const fetchMarkets = useCallback(async () => {
    try {
      const response = await MarketService.getMarkets(currentPage, marketsPerPage, sortBy, isAsc, searchTerm);
      setMarkets(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error fetching Markets:', error);
    }
  }, [currentPage, marketsPerPage, sortBy, isAsc, searchTerm]);

  useEffect(() => {
    fetchMarkets();
  }, [fetchMarkets]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleOrderChange = (e) => {
    setIsAsc(e.target.value === 'asc');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchMarkets();
  };

  const handleCreateMarket = () => {
    navigate('/create-market');
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="market-list-container">
      <form onSubmit={handleSearchSubmit}>
        <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search Markets" />
        <select value={sortBy} onChange={handleSortChange}>
          <option value="createdAt">Date</option>
          <option value="title">Title</option>
        </select>
        <select value={isAsc ? 'asc' : 'desc'} onChange={handleOrderChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <button type="submit">Search</button>
      </form>

      <h4>Markets</h4>

      <div className="market-cards">
        {markets.map((market, index) => (
          <Link to={`/markets/${market.id}`} key={market.id} className="market-card">
            <img src={market.imageUrls[0] || 'path/to/defaultImage.png'} alt="Market" />
            <div>{(currentPage - 1) * marketsPerPage + index + 1}. {market.name}</div>
          </Link>
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />

      <button onClick={handleCreateMarket} style={{ marginTop: '20px' }}>
        Market 등록
      </button>
    </div>
  );
}

export default MarketList;
