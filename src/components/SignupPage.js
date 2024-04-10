import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from './AuthService'; 

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [admin, setAdmin] = useState(false);
  const [adminToken, setAdminToken] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await authService.signup({
        email,
        password,
        username,
        birthDate,
        gender,
        admin,
        adminToken,
      });
      alert("회원 가입 성공!");
      navigate('/login'); // Redirect to login page on successful signup
    } catch (error) {
      console.error("Signup failed", error);
      alert(error.response?.data?.message || "회원가입에 실패했습니다."); // Display the failure message
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
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
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Username"
        />
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
          placeholder="Birth Date (YYYY-MM-DD)"
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="" disabled>Select Gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="O">Other</option>
        </select>
        <label>
          <input
            type="checkbox"
            checked={admin}
            onChange={(e) => setAdmin(e.target.checked)}
          /> Are you an admin?
        </label>
        {admin && (
          <input
            type="text"
            value={adminToken}
            onChange={(e) => setAdminToken(e.target.value)}
            placeholder="Admin Token"
          />
        )}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupPage;
