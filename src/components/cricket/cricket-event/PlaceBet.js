import React from 'react';
import './EventDetailPage.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlaceBet = ({ selectedBet, selectedMarketIndex, setSelectedBet, setStake, stake, setSelectedMarketIndex }) => {
  
  const handlePlaceBet = () => {
    // Check if stake is valid
    if (!stake || Number(stake) < 100) {
      toast.error('Please enter a valid stake amount (min: 100)', {
        position: "top-right",
        autoClose: 3000
      });
      return;
    }
    
    // Show success message
    toast.success('Bet placed successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
    
    // Reset the form
    setSelectedBet(null);
    setStake('');
    setSelectedMarketIndex(null);
  };
  
  return (
    <div className="event-place-bet">
      <div className="event-place-bet-title">Place Bet</div>
      <div className="event-place-bet-content">
        {selectedBet && selectedMarketIndex !== null ? (
          <div className="place-bet-card" style={{ background: '#ffcccb', padding: '10px', borderRadius: '5px' }}>
            <div style={{ 
              background: '#fff', 
              padding: '10px', 
              textAlign: 'center', 
              borderRadius: '5px',
              border: '1px solid #ffb6b6',
              marginBottom: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px'
            }}>
              <div style={{ fontWeight: 'bold', color: selectedBet.odd.type === 'no' ? '#d32f2f' : '#1976d2' }}>
                {selectedBet.market.name} - {selectedBet.odd.type.toUpperCase()}: {selectedBet.odd.value}
              </div>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                {stake}
              </div>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '4px',
              marginBottom: '8px'
            }}>
              <button
                className="place-bet-stake-btn"
                style={{
                  padding: '6px',
                  background: 'white',
                  border: '1px solid #ff9999',
                  borderRadius: '3px',
                  color: 'green',
                  fontWeight: 'bold'
                }}
                onClick={() => setStake(prev => Number(prev || 0) + 500)}
              >+ 500</button>
              <button
                className="place-bet-stake-btn"
                style={{
                  padding: '6px',
                  background: 'white',
                  border: '1px solid #ff9999',
                  borderRadius: '3px',
                  color: 'green',
                  fontWeight: 'bold'
                }}
                onClick={() => setStake(prev => Number(prev || 0) + 1000)}
              >+ 1000</button>
              <button
                className="place-bet-stake-btn"
                style={{
                  padding: '6px',
                  background: 'white',
                  border: '1px solid #ff9999',
                  borderRadius: '3px',
                  color: 'green',
                  fontWeight: 'bold'
                }}
                onClick={() => setStake(prev => Number(prev || 0) + 2000)}
              >+ 2000</button>
              <button
                className="place-bet-stake-btn"
                style={{
                  padding: '6px',
                  background: 'white',
                  border: '1px solid #ff9999',
                  borderRadius: '3px',
                  color: 'green',
                  fontWeight: 'bold'
                }}
                onClick={() => setStake(prev => Number(prev || 0) + 5000)}
              >+ 5000</button>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '4px',
              marginBottom: '8px'
            }}>
              <button
                className="place-bet-stake-btn"
                style={{
                  padding: '6px',
                  background: 'white',
                  border: '1px solid #ff9999',
                  borderRadius: '3px',
                  color: 'green',
                  fontWeight: 'bold'
                }}
                onClick={() => setStake(prev => Number(prev || 0) + 10000)}
              >+ 10000</button>
              <button
                className="place-bet-stake-btn"
                style={{
                  padding: '6px',
                  background: 'white',
                  border: '1px solid #ff9999',
                  borderRadius: '3px',
                  color: 'green',
                  fontWeight: 'bold'
                }}
                onClick={() => setStake(prev => Number(prev || 0) + 20000)}
              >+ 20000</button>
              <button
                className="place-bet-stake-btn"
                style={{
                  padding: '6px',
                  background: 'white',
                  border: '1px solid #ff9999',
                  borderRadius: '3px',
                  color: 'green',
                  fontWeight: 'bold'
                }}
                onClick={() => setStake(9189484)}
              >+ 30000</button>
              <button
                className="place-bet-stake-btn"
                style={{
                  padding: '6px',
                  background: 'white',
                  border: '1px solid #ff9999',
                  borderRadius: '3px',
                  color: 'green',
                  fontWeight: 'bold'
                }}
                onClick={() => setStake(9189484)}
              >+ 9189484</button>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '4px',
              marginBottom: '8px'
            }}>
              <button
                style={{
                  padding: '8px',
                  background: '#c3003c',
                  border: 'none',
                  borderRadius: '3px',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '10px'
                }}
                onClick={() => setStake(100)}
              >MIN STAKE</button>
              <button
                style={{
                  padding: '8px',
                  background: '#3c0050',
                  border: 'none',
                  borderRadius: '3px',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '10px'
                }}
                onClick={() => setStake(25000)}
              >MAX STAKE</button>
              <button
                style={{
                  padding: '8px',
                  background: 'green',
                  border: 'none',
                  borderRadius: '3px',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '10px'
                }}
                onClick={() => {}}
              >EDIT STAKE</button>
              <button
                style={{
                  padding: '8px',
                  background: 'red',
                  border: 'none',
                  borderRadius: '3px',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '10px'
                }}
                onClick={() => setStake('')}
              >CLEAR</button>
            </div>
            
            <div style={{
              fontSize: '12px',
              padding: '5px',
              textAlign: 'center',
              marginBottom: '8px'
            }}>
              Min Bet: 100 Max Bet: 25000
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0',
              marginTop: '8px'
            }}>
              <button
                style={{
                  padding: '12px',
                  background: '#ff9999',
                  border: 'none',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}
                onClick={() => { setSelectedBet(null); setStake(''); setSelectedMarketIndex(null); }}
              >
                CANCEL
              </button>
              <button
                style={{
                  padding: '12px',
                  background: 'green',
                  border: 'none',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}
                onClick={handlePlaceBet}
              >
                PLACE BET
              </button>
            </div>
          </div>
        ) : (
          <div className="event-bet-placeholder" style={{
            padding: '20px',
            textAlign: 'center',
            color: '#666'
          }}>
            Select a market to place bet
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceBet; 