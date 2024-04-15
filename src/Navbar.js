import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from './components/AuthService';

const Navbar = ({ currentUser, onLogout }) => {
  const handleLogout = () => {
    AuthService.logout();
    onLogout();
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#333', padding: '10px', color: 'white' }}>
      <div style={{ flexGrow: 1 }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          Home
        </Link>
      </div>
      {currentUser ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '20px' }}>
            Welcome, {currentUser.username}!
          </span>
          <button onClick={handleLogout} style={{ marginRight: '10px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>Logout</button>
          <Link to="/profile" style={{ textDecoration: 'none', color: 'white' }}>Profile</Link>
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
