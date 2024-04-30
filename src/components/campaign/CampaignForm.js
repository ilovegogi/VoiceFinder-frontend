import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CampaignService from '../../services/CampaignService';
import './CampaignForm.css'; 

function CampaignForm({ editMode, existingCampaign }) {
  const { marketId } = useParams();
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    marketId: marketId,
    keyword: '',
    description: '',
    gender: '',
    age: [],
    job: [],
    imageUrls: []
  });
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMultiChange = (e) => {
    setFormData({ ...formData, [e.target.name]: [...e.target.options].filter(option => option.selected).map(option => option.value) });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionFormData = new FormData();
    const postRequestDto = {
      marketId: marketId,
      title: formData.title,
      keyword: formData.keyword,
      description: formData.description,
      gender: formData.gender,
      age: formData.age,
      job: formData.job,
    };
    submissionFormData.append('post', new Blob([JSON.stringify(postRequestDto)], { type: 'application/json' }));
    Array.from(files).forEach(file => {
      submissionFormData.append('imageUrls', file);
    });

    try {
      if (editMode) {
        await CampaignService.updateCampaign(campaignId, submissionFormData);
      } else {
        await CampaignService.createCampaign(submissionFormData);
      }
      navigate('/');
    } catch (error) {
      console.error('Error submitting campaign:', error);
    }
  };

  return (
    <div className="campaign-form-container">
      <h2>{editMode ? 'Edit Campaign' : 'Create Campaign'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
        <input type="text" name="keyword" placeholder="Keyword" value={formData.keyword} onChange={handleChange} />
        <textarea name="description" placeholder="Description" rows="4" value={formData.description} onChange={handleChange} />
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Man">Male</option>
          <option value="Woman">Female</option>
          <option value="Any">Any</option>
        </select>
        <select name="age" multiple value={formData.age} onChange={handleMultiChange}>
          <option value="18-24">18-24</option>
          <option value="25-34">25-34</option>
          <option value="35-44">35-44</option>
          <option value="45-54">45-54</option>

          {/* More age ranges */}
        </select>
        <select name="job" multiple value={formData.job} onChange={handleMultiChange}>
          <option value="student">Student</option>
          <option value="professional">Professional</option>
          <option value="retired">Retired</option>
          {/* More job categories */}
        </select>
        <input type="file" multiple onChange={handleFileChange} id="file-input" />

        {/* <label htmlFor="file-input"><button type="button">Upload Images</button></label> */}
        {/* {fileNames.length > 0 && fileNames.map((fileName, index) => <p key={index}>{fileName}</p>)} */}
        <button type="submit">{editMode ? 'Update' : 'Submit'}</button>
      </form>
    </div>
  );
}

export default CampaignForm;
