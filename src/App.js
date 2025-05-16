import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LoginModal from './components/LoginModal';
import BottomNavBar from './components/BottomNavBar';
import CricketPage from './components/cricket/CricketPage';
import FootballPage from './components/football/FootballPage';
import TennisPage from './components/tennis/TennisPage';
import { Routes, Route } from 'react-router-dom';
import EventDetailPage from './components/cricket/cricket-event/EventDetailPage';
// Placeholder imports for new components
// import Header from './components/Header';
// import Sidebar from './components/Sidebar';
// import LoginModal from './components/LoginModal';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Multi Market');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogin(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    setShowLogin(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="App">
      <Header />
      <BottomNavBar /> 
      <Sidebar onCategorySelect={setSelectedCategory} />
      <div style={{ marginLeft: 220, paddingTop: 100 }}>
        {/* Main content area */}
        {showSuccess && (
          <div style={{position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', background: '#2ecc40', color: '#fff', padding: '20px 40px', borderRadius: 8, zIndex: 2000}}>
            <strong>Success!</strong><br />Successfully Login!
          </div>
        )}
        <LoginModal open={showLogin} onClose={() => setShowLogin(false)} onLogin={handleLogin} />
        <Routes>
          <Route path="/sports-event-detail/:id" element={<EventDetailPage />} />
          <Route path="/" element={
            selectedCategory === 'Multi Market' ? (
              <>
                <CricketPage />
                <FootballPage />
                <TennisPage />
              </>
            ) : selectedCategory === 'Cricket' ? (
              <CricketPage />
            ) : selectedCategory === 'Football' ? (
              <FootballPage />
            ) : selectedCategory === 'Tennis' ? (
              <TennisPage />
            ) : (
              <div style={{padding: 40, color: '#888'}}>Select a category from the sidebar.</div>
            )
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
