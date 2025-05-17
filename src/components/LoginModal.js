import React, { useState } from 'react';
import './LoginModal.css';
import Logo_login from "../assets/Images/logo.png"

const LoginModal = ({ open, onClose, onLogin }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Left: Form */}
        <div className="form-section">
          <img src={Logo_login} alt="logo" className="login-image-main" />
          <input 
            value={userId} 
            onChange={e => setUserId(e.target.value)} 
            placeholder="Enter User ID" 
            className="input-field" 
          />
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            placeholder="Enter Password*" 
            className="input-field" 
          />
          <div className="button-container">
            <button onClick={onLogin} className="login-button">LOGIN WITH DEMO ID</button>
            <button onClick={onLogin} className="login-button">LOG IN</button>
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