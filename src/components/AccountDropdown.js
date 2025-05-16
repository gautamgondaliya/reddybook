import React, { useState } from 'react';
import { FaUser, FaHistory, FaChartBar, FaFileAlt, FaCog, FaBell, FaLanguage, FaKey, FaSignOutAlt, FaChartLine } from 'react-icons/fa';
import './AccountDropdown.css';

const menuItems = [
  { label: 'My Profile', icon: <FaUser /> },
  { label: 'Unsettled Bets', icon: <FaChartBar /> },
  { label: 'Bet History', icon: <FaHistory /> },
  { label: 'Profit & Loss', icon: <FaChartLine /> },
  { label: 'Account Statement', icon: <FaFileAlt /> },
  { label: 'Stake Settings', icon: <FaCog /> },
  { label: 'Notifications', icon: <FaBell /> },
  { label: 'Language', icon: <FaLanguage /> },
  { label: 'Change Password', icon: <FaKey /> },
];

const AccountDropdown = ({ onClose, onSignOut }) => {
  const [oneClick, setOneClick] = useState(false);
  const [active, setActive] = useState(menuItems[0].label);

  return (
    <div className="account-dropdown">
      <div className="account-dropdown-header">
        HI, DEMO746
        <span className="account-dropdown-close" onClick={onClose}>✖</span>
      </div>
      <div className="account-dropdown-toggle-row">
        One Click Bet
        <span className="account-dropdown-toggle-label" />
        <label className="account-dropdown-toggle-switch">
          <input
            type="checkbox"
            checked={oneClick}
            onChange={() => setOneClick(v => !v)}
          />
          <span className="account-dropdown-toggle-slider" />
          <span className="account-dropdown-toggle-knob" style={oneClick ? { left: '16px' } : { left: '2px' }} />
        </label>
      </div>
      <div className="account-dropdown-balance">
        <div style={{ marginBottom: 6 }} className="main-balance-part">
          <div className="main-balance-show-left">
          <div className="account-dropdown-balance-label">Wallet Amount</div>
         
          <div className="account-dropdown-balance-bonus">(Inclusive bonus)</div>
          </div>
          <div className="main-balance-show-right">
             <div className="account-dropdown-balance-value">500.84</div>
          </div>


        </div>
        <div style={{ marginBottom: 8 }}>
        <div className="exposure-balance-main">
          <div className="account-dropdown-balance-label">Net Exposure</div>
          <div className="account-dropdown-balance-value">500.00</div>
          </div>
        </div>
      </div>
      <div className="account-dropdown-menu">
        {menuItems.map(item => (
          <div
            key={item.label}
            className={`account-dropdown-menu-item${active === item.label ? ' active' : ''}`}
            onMouseEnter={() => setActive(item.label)}
            onClick={() => setActive(item.label)}
          >
            <span className="account-dropdown-menu-icon">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>
      <button
        className="account-dropdown-signout"
        onClick={onSignOut}
      >
        <FaSignOutAlt style={{ marginRight: 7, fontSize: 16 }} /> SIGN OUT
      </button>
    </div>
  );
};

export default AccountDropdown; 