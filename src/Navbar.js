import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from './services/AuthService';

const Navbar = ({ currentUser, onLogout }) => {
  const handleLogout = () => {
    AuthService.logout();
    onLogout();
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#333', padding: '10px', color: 'white' }}>
      <div style={{ flexGrow: 1 }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'green' }}>
          VoiceFinder
        </Link>
        <Link to="/about" style={{ marginLeft: '10px', textDecoration: 'none', color: 'white' }}>
          About
        </Link>
        <Link to="/campaigns" style={{ marginLeft: '10px', textDecoration: 'none', color: 'white' }}>
          Campaigns
        </Link>
        <Link to="/markets" style={{ marginLeft: '10px', textDecoration: 'none', color: 'white' }}>
          Markets
        </Link>
      </div>
      {currentUser ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button onClick={handleLogout} style={{ fontSize: '15px', marginRight: '10px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>Logout</button>
          <Link to="/profile" style={{ textDecoration: 'none', color: 'white' }}>My Page</Link>
        </div>
      ) : (
        <div>
          <Link to="/login" style={{ marginRight: '10px', textDecoration: 'none', color: 'white' }}>Login</Link>
          <Link to="/signup" style={{ textDecoration: 'none', color: 'white' }}>Signup</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
