import React, { useState, useRef, useEffect } from 'react';
import LoginModal from './LoginModal';
import AccountDropdown from './AccountDropdown';
import "./Header.css";
// You can replace these with react-icons or SVGs later
const navItems = [
  { label: 'HOME' },
  { label: 'IN-PLAY' },
  { label: 'CRICKET' },
  { label: 'FOOTBALL' },
  { label: 'TENNIS' },
  { label: 'SPORTS BOOK' },
  { label: 'MATKA' },
  { label: 'CRICKET FIGHT' },
  { label: 'CASINO' },
  { label: 'EVOLUTION' },
  { label: 'FIFA CUP WINNER' },
  { label: 'WINNER CUP' },
  { label: 'ELECTION' },
];

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const userRef = useRef();

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userRef.current && !userRef.current.contains(event.target)) {
        setShowAccount(false);
      }
    };
    if (showAccount) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAccount]);

  return (
    <>
      <style>{`
      .rb-header {
               display: flex;
    width: -webkit-fill-available;
    align-items: center;
    justify-content: center;
    background-color: #f5eeee !important;
    background-image: url(../assets/Images/headerback.webp);
    padding: 12px 86px;
    position: fixed;
    box-shadow: 0 2px 8px rgba(0,0,0,0.03);
    z-index: 1100;
    height:55px;
      }
      .rb-header-logo {
        font-weight: bold;
        font-size: 28px;
        color: #d4af37;
        margin-right: 18px;
        display: flex;
        align-items: center;
        white-space: nowrap;
      }
      .rb-header-search {
        flex: 1;
        display: flex;
        align-items: center;
        min-width: 0;
        
      }
      .rb-header-search input {
        width: 100%;
        max-width: 340px;
        min-width: 80px;
        padding: 8px 16px;
        border-radius: 8px;
        border: none;
        box-shadow: 0 1px 4px #eee;
        font-size: 16px;
        transition: max-width 0.2s;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      }
      .rb-header-search-icon {
        margin-left: -32px;
        color: #888;
        font-size: 20px;
        cursor: pointer;
        z-index: 1;
        
      }
      .rb-header-right {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-left: 18px;
      }
      .rb-header-badge {
       background: #c8002f;
      color: #fff;
      border-radius: 0 0 30px 30px;
      padding: 4px 12px 11px 12px;
      text-align: center;
      min-width: 60px;
      }
      .rb-header-user {
        background: #c8002f;
        color: #fff;
        border-radius: 6px;
        padding: 8px 12px;
        font-weight: 700;
        font-size: 15px;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      @media (max-width: 900px) {
        .rb-header-search input {
          max-width: 180px;
        }
        .rb-header-logo {
          font-size: 20px;
        }
        .rb-header-badge {
          min-width: 48px;
          padding: 6px 6px 12px 6px;
        }
        .rb-header-user {
          font-size: 13px;
          padding: 6px 8px;
        }
      }
      @media (max-width: 600px) {
        .rb-header {
          flex-direction: column;
          align-items: stretch;
          padding: 8px 4px;
        }
        .rb-header-logo {
          margin-right: 0;
          margin-bottom: 6px;
          justify-content: center;
        }
        .rb-header-search {
          margin-bottom: 6px;
        }
        .rb-header-right {
          justify-content: center;
          margin-left: 0;
        }
      }
      @media (max-width: 400px) {
        .rb-header-search input {
          max-width: 100px;
          font-size: 13px;
        }
        .rb-header-logo {
          font-size: 15px;
        }
      }
    `}</style>
    <header className="rb-header">
      {/* Logo */}
      <div className="rb-header-logo">
        RED<span style={{position: 'relative', top: -2, left: 2, background: '#222', color: '#ffd700', borderRadius: 4, padding: '0 4px', fontSize: 16, margin: '0 2px'}}>BOOK</span>
        <span style={{fontSize: 13, color: '#d4af37', marginLeft: 4, fontWeight: 400}}>399</span>
      </div>
      {/* Search Bar */}
      <div className="rb-header-search">
        <input type="text" placeholder="Search Events" />
        <span className="rb-header-search-icon">&#128269;</span>
      </div>
      {/* Right Side: BAL, EXP, User or Login Button */}
      <div className="rb-header-right">
        {isLoggedIn ? (
          <>
          
            <div className="rb-header-badge">
              <div style={{fontSize: 13, fontWeight: 700, letterSpacing: 1}}>BAL</div>
              <div style={{fontSize: 18, fontWeight: 700}}>500.84</div>
            </div>
            <div className="rb-header-badge">
              <div style={{fontSize: 13, fontWeight: 700, letterSpacing: 1}}>EXP</div>
              <div style={{fontSize: 18, fontWeight: 700}}>500</div>
            </div>
            <div style={{ position: 'relative' }} ref={userRef}>
              <div className="rb-header-user" onClick={() => setShowAccount(v => !v)} style={{ cursor: 'pointer' }}>
                DEMO746 <span style={{fontSize: 18}}>&#128100;</span>
              </div>
              {showAccount && (
                <AccountDropdown
                  onClose={() => setShowAccount(false)}
                  onSignOut={() => {
                    setIsLoggedIn(false);
                    setShowAccount(false);
                  }}
                />
              )}
            </div>
           
          </>
        ) : (
          <button
            style={{
              background: '#222',
              color: '#fff',
              border: '2px solid #c8002f',
              borderRadius: '20px',
              padding: '6px 18px',
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
              letterSpacing: 1,
            }}
            onClick={() => setShowLogin(true)}
          >
            LOGIN
          </button>
        )}
      </div>
     
    </header>
    <LoginModal
      open={showLogin}
      onClose={() => setShowLogin(false)}
      onLogin={handleLogin}
    />
    </>
  );
};

export default Header; 