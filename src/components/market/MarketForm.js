import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MarketService from '../../services/MarketService';
import './MarketForm.css'; // Assuming you have a CSS file for styles

function MarketForm({ editMode, existingMarket }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    wayDescription: '',
    category: '',
    address: '',
    imageUrls: []
  });
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const { marketId } = useParams();

  useEffect(() => {
    if (editMode && existingMarket) {
      setFormData({
        name: existingMarket.name,
        description: existingMarket.description,
        wayDescription: existingMarket.wayDescription,
        category: existingMarket.category,
        address: existingMarket.address,
        imageUrls: existingMarket.imageUrls
      });
    }
  }, [editMode, existingMarket]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionFormData = new FormData();
    const postRequestDto = {
      name: formData.name,
      description: formData.description,
      wayDescription: formData.wayDescription,
      category: formData.category,
      address: formData.address,
    };
    submissionFormData.append('post', new Blob([JSON.stringify(postRequestDto)], { type: 'application/json' }));
    Array.from(files).forEach(file => {
      submissionFormData.append('imageUrls', file);
    });

    try {
      if (editMode) {
        await MarketService.updateMarket(marketId, submissionFormData);
      } else {
        await MarketService.createMarket(submissionFormData);
      }
      navigate('/');
    } catch (error) {
      console.error('Error submitting market:', error);
    }
  };

  return (
    <div className="market-form">
      <h2>{editMode ? 'Edit Market' : 'Market 등록'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Market Name" value={formData.name} onChange={handleChange} />
        <textarea name="description" placeholder="Market Description" value={formData.description} onChange={handleChange} />
        <textarea name="wayDescription" placeholder="Way Description" value={formData.wayDescription} onChange={handleChange} />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
        <input type="file" multiple onChange={handleFileChange} id="file-input" />
        <button type="submit">{editMode ? 'Update' : '등록'}</button>
      </form>
    </div>
  );
}

export default MarketForm;
