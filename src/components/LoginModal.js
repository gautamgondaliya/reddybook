import React, { useState } from 'react';

const LoginModal = ({ open, onClose, onLogin }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  if (!open) return null;
  return (
    <div style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{width: 600, height: 400, background: '#fff', borderRadius: 10, boxShadow: '0 8px 32px rgba(0,0,0,0.2)', display: 'flex', overflow: 'hidden', position: 'relative'}}>
        {/* Left: Form */}
        <div style={{flex: 1, background: '#0a4c8b', color: '#fff', padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <div style={{fontWeight: 'bold', fontSize: 28, marginBottom: 24}}>REDBOOK <span style={{fontSize: 14, color: '#ffd700'}}>399</span></div>
          <input value={userId} onChange={e => setUserId(e.target.value)} placeholder="Enter User ID" style={{width: '100%', marginBottom: 16, padding: 10, borderRadius: 4, border: 'none'}} />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Password*" style={{width: '100%', marginBottom: 16, padding: 10, borderRadius: 4, border: 'none'}} />
          <div style={{display: 'flex', gap: 10, width: '100%', marginBottom: 16}}>
            <button onClick={onLogin} style={{flex: 1, background: '#fff', color: '#0a4c8b', border: 'none', borderRadius: 4, padding: 10, fontWeight: 600}}>LOGIN WITH DEMO ID</button>
            <button onClick={onLogin} style={{flex: 1, background: '#fff', color: '#0a4c8b', border: 'none', borderRadius: 4, padding: 10, fontWeight: 600}}>LOG IN</button>
          </div>
          <button style={{width: '100%', background: '#a00', color: '#fff', border: 'none', borderRadius: 4, padding: 10, fontWeight: 600, marginTop: 8}}>Download APK <span role="img" aria-label="android">🤖</span></button>
        </div>
        {/* Right: Image */}
        <div style={{flex: 1, background: 'linear-gradient(135deg, #f7b2d9 0%, #f7e1b2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&w=300&h=400&fit=crop" alt="login visual" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        </div>
        <button onClick={onClose} style={{position: 'absolute', top: 10, right: 10, background: 'transparent', border: 'none', color: '#fff', fontSize: 24, cursor: 'pointer', zIndex: 10}}>&times;</button>
      </div>
    </div>
  );
};

export default LoginModal; 