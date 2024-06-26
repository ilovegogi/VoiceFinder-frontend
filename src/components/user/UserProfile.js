import React, { useEffect, useState } from 'react';
import apiClient from '../../apiClient';
import './UserProfile.css';  // Import the CSS file

function UserProfile({ currentUser }) {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    username: '',
    gender: '',
    imageUrl: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiClient.get('/api/users/profile');
        setProfile(response.data);
        setFormData({ ...formData, username: response.data.username, gender: response.data.gender });
        setPreviewImage(response.data.imageUrl);
      } catch (error) {
        console.error('프로필 가져오기 실패', error);
      }
    };
    fetchProfile();
  }, [formData]);

  const handleEditProfileToggle = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const data = new FormData();
      data.append('password', formData.currentPassword);
      if (formData.newPassword) data.append('newPassword', formData.newPassword);
      if (formData.username) data.append('username', formData.username);
      if (formData.gender) data.append('gender', formData.gender);
      if (imageFile) data.append('imageUrl', imageFile);

      await apiClient.put('/api/users/profile', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('프로필이 성공적으로 업데이트되었습니다.');
      setEditMode(false);
      window.location.reload();
    } catch (error) {
      console.error('프로필 업데이트 실패', error);
      alert('프로필 업데이트에 실패했습니다.');
    }
  };

  return (
    <div className="profile-container">
      <button onClick={handleEditProfileToggle} className="edit-toggle">{editMode ? '취소' : '프로필 수정'}</button>

      {editMode ? (
        <form onSubmit={handleProfileUpdate} className="profile-form">
          <label for='username'>이름</label>
          <input type="text" id="username" name="username" placeholder="이름" value={formData.username} onChange={handleChange} />
          {/* <input type="text" name="gender" placeholder="성별" value={formData.gender} onChange={handleChange} /> */}
          <label for='image'>프로필 이미지</label>
          <input type="file" id="image" name="image" onChange={handleFileChange} />
          {previewImage && <img src={previewImage} alt="Preview" className="preview-image" />}
          <input type="password" name="newPassword" placeholder="새 비밀번호 (선택사항)" onChange={handleChange} />
          <input type="password" name="currentPassword" placeholder="현재 비밀번호 (필수사항)" onChange={handleChange} required />
          <button type="submit">저장</button>
        </form>
      ) : profile ? (
        <div className="profile-info">
          {profile.imageUrl && <img src={profile.imageUrl} alt="프로필 이미지" className="profile-image" />}
          <div className="profile-details">
            <p>이름: {profile.username}</p>
            <p>이메일: {profile.email}</p>
            {/* <p>성별: {profile.gender}</p>
            <p>생일: {profile.birthDate}</p>
            <p>역할: {profile.role}</p> */}
          </div>
        </div>
      ) : (
        <p>프로필 정보를 불러오는 중...</p>
      )}
    </div>
  );
}

export default UserProfile;
