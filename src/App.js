import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/Home';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import AuthService from './components/AuthService';
import Navbar from './Navbar';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

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
        setIsLoading(false); // 로딩 완료
      }
    };

    fetchCurrentUser();
  }, []);

  const handleLogout = () => {
    AuthService.logout(); // AuthService에서 로그아웃 처리
    setCurrentUser(null);
  };

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중 표시
  }

  return (
    <BrowserRouter>
      <div className="app-container"> {/* 중앙 정렬을 위한 컨테이너 */}
        <Navbar currentUser={currentUser} onLogout={handleLogout} />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={currentUser ? <HomePage currentUser={currentUser} /> : <Navigate replace to="/login" />} />
        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;
