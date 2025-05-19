import React, { useState } from 'react';
import './LoginModal.css';
import Logo_login from "../assets/Images/logo.png"
import axios from 'axios';

const LoginModal = ({ open, onClose, onLogin }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  if (!open) return null;

  const handleLogin = async () => {
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: userId, // assuming userId is the email
        password
      });
      // Save token (optional)
      localStorage.setItem('token', response.data.token);
      // Call parent onLogin with user info if needed
      if (onLogin) onLogin(response.data.user);
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.error ||
        'Login failed. Please check your credentials.'
      );
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Left: Form */}
        <div className="form-section">
          <img src={Logo_login} alt="logo" className="login-image-main" />
          <input 
            value={userId} 
            onChange={e => setUserId(e.target.value)} 
            placeholder="Enter Email" 
            className="input-field" 
          />
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            placeholder="Enter Password*" 
            className="input-field" 
          />
          {error && <div className="login-error">{error}</div>}
          <div className="button-container">
            <button onClick={handleLogin} className="login-button">LOG IN</button>
          </div>
          <button className="download-button">Download APK <span role="img" aria-label="android">🤖</span></button>
        </div>
        {/* Right: Image */}
        <div className="image-section">
          <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&w=300&h=400&fit=crop" alt="login visual" className="login-image" />
        </div>
        <button onClick={onClose} className="close-button">&times;</button>
      </div>
    </div>
  );
};

export default LoginModal; 