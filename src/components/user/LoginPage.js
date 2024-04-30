import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/AuthService';
import './LoginPage.css'; 

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authService.login(email, password);
      navigate('/');
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleSocialLogin = (social) => {
    window.location.href = `http://localhost:8080/oauth2/authorization/${social}`;
  };

  return (
    <div className="login-container">
      <h2>Login to Your Account</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
          className="input-field"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
          className="input-field"
        />
        <button type="submit" className="submit-btn">Login</button>
      </form>
      <div className="social-login">
        <button onClick={() => handleSocialLogin('google')} className="social-btn google">Login with Google</button>
        <button onClick={() => handleSocialLogin('naver')} className="social-btn naver">Login with Naver</button>
        <button onClick={() => handleSocialLogin('kakao')} className="social-btn kakao">Login with Kakao</button>
      </div>
      <button onClick={() => navigate('/signup')} className="signup-btn">Sign Up</button>
    </div>
  );
}

export default LoginPage;
