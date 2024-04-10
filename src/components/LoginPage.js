import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from './AuthService'; 


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authService.login(email, password);
      window.location.href = '/';
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleSocialLogin = (social) => {
    window.location.href = `http://localhost:8080/oauth2/authorization/${social}`; // Redirect to the social login URL
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      <div>
        <button onClick={() => handleSocialLogin('google')}>Login with Google</button>
        <button onClick={() => handleSocialLogin('naver')}>Login with Naver</button>
        <button onClick={() => handleSocialLogin('kakao')}>Login with Kakao</button>
      </div>
      <button onClick={() => navigate('/signup')}>Sign Up</button> {/* Add navigation to the signup page */}
    </div>
  );
}

export default LoginPage;
