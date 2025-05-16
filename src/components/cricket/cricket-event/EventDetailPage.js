import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EventDetailPage.css';
import BetsModal from './BetsModal';

const TABS = [
  { key: 'FANCY', label: 'Fancy' },
  { key: 'PREMIUM_FANCY', label: 'Premium Fancy' },
  { key: 'LINE_MARKETS', label: 'Line Markets' },
  { key: 'SESSION_MARKETS', label: 'Session Markets' },
  { key: 'OVER_SESSION_MARKET', label: 'Over Session Market' },
  { key: 'BALL_BY_BALL', label: 'Ball By Ball' },
  { key: 'FALL_OF_WICKET', label: 'Fall Of Wicket' },
  { key: 'OTHER_MARKETS', label: 'Other Markets' },
  { key: 'TOTAL_ADVANCE', label: 'Total Advance' },
  { key: 'METER_MARKETS', label: 'Meter Markets' },
  { key: 'KHADO_MARKETS', label: 'Khado Markets' },
  { key: 'ODD_EVEN_MARKETS', label: 'Odd Event Markets' },
  { key: 'BOOKMAKER', label: 'Bookmaker' },
  { key: 'WINNING_ODDS', label: 'Winning Odds' },
];

const EventDetailPage = () => {
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState('SESSION_MARKETS');
  const [betsModalOpen, setBetsModalOpen] = useState(false);
  const [selectedBet, setSelectedBet] = useState(null);
  const [stake, setStake] = useState('');
  const [selectedMarketIndex, setSelectedMarketIndex] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.dynexbet.com/api/v1/event/details/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch event data');
        }
        const data = await response.json();
        setEventData(data.data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEventData();
    }
  }, [id]);

  if (loading) {
    return <div style={{ padding: 40, color: '#888' }}>Loading event details...</div>;
  }

  if (error) {
    return <div style={{ padding: 40, color: '#f44336' }}>Error: {error}</div>;
  }

  if (!eventData) {
    return <div style={{ padding: 40, color: '#888' }}>Event not found.</div>;
  }

  // Transform market data to include both YES and NO values
  const shownMarkets = selectedTab === 'SESSION_MARKETS' ? 
    eventData.catalogues
      .filter(market => market.marketType === 'OVERS')
      .map(market => ({
        name: market.marketName,
        marketId: market.marketId,
        odds: [
          {
            value: Number(market.runners[0]?.id || 0) - 1,  // NO value
            stake: market.marketCondition.minBet,
            type: "no"
          },
          {
            value: market.runners[0]?.id,  // YES value
            stake: market.marketCondition.minBet,
            type: "yes"
          }
        ],
        checked: market.status === 'OPEN',
        maxBet: market.marketCondition.maxBet,
        maxMarket: market.marketCondition.maxProfit,
      })) : [];

  return (
    <div className="event-detail-container">
      <div className="event-detail-container-right">
        <div className="event-detail-header-row">
          <div className="event-detail-header">
            <span className="event-detail-date">
              ({new Date(eventData.event.openDate).toLocaleString('en-US', {
                month: 'numeric', day: 'numeric', year: 'numeric',
                hour: 'numeric', minute: '2-digit', hour12: true
              })})
            </span>
            <span className="event-detail-name">
              {eventData.event.name}
            </span>
          </div>
          <button className="event-detail-bets-btn" onClick={() => setBetsModalOpen(true)}>BETS(0)</button>
        </div>
        <ul className="event-detail-tabs nav nav-tabs" role="tablist">
          {TABS.map(tab => (
            <li className="nav-item" role="presentation" key={tab.key}>
              <button
                className={`nav-link event-detail-tab${selectedTab === tab.key ? ' active' : ''}`}
                id={`${tab.key.toLowerCase()}-tab`}
                type="button"
                role="tab"
                aria-selected={selectedTab === tab.key}
                onClick={() => setSelectedTab(tab.key)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="event-detail-markets">
          <div className="event-market-section">
            <div className="event-title-name-all">
              <div className="event-market-title">{selectedTab}</div>
              <div className="event-market-yes-no">
                <div className="event-name-no">NO</div>
                <div className="event-name-yes">YES</div>
              </div>
            </div>
            {shownMarkets.map((item, i) => (
              <div className="event-market-row" key={item.marketId}>
                <div className="event-market-name-row">
                  <span className="event-market-bookmark" style={{marginRight: 8}}>🔖</span>
                  <span className="event-market-name">{item.name}</span>
                  {item.checked && <span className="event-market-checked" style={{marginLeft: 8}}>✔️</span>}
                </div>
                <div className="event-market-odds-row">
                  <div className="event-market-odds-container" style={{ display: 'flex', gap: '10px', flex: 1 }}>
                    {item.odds.map((odd, j) => (
                      <div
                        key={j}
                        className={`event-market-odd event-market-odd-${odd.type} ${selectedBet && selectedBet.marketIndex === i && selectedBet.oddIndex === j ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedMarketIndex(i);
                          setSelectedBet({ marketIndex: i, oddIndex: j, market: item, odd });
                          setStake('');
                        }}
                        style={{
                          cursor: 'pointer',
                          flex: 1,
                          backgroundColor: odd.type === 'no' ? '#ffcdd2' : '#bbdefb',
                          padding: '8px',
                          borderRadius: '4px',
                          textAlign: 'center'
                        }}
                      >
                        <div className="event-market-odd-value" style={{ fontSize: '16px', fontWeight: 'bold' }}>{odd.value}</div>
                        <div className="event-market-odd-stake" style={{ fontSize: '14px', color: '#666' }}>{odd.stake}</div>
                      </div>
                    ))}
                  </div>
                  <div className="event-market-meta" style={{ marginLeft: '10px', textAlign: 'right' }}>
                    <div>Max Bet: {item.maxBet}</div>
                    <div>Max Market: {item.maxMarket}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="event-detail-container-left">
        <div className="event-score-board">
          <div className="event-score-board-title">Score Board</div>
          <div className="event-score-board-content">
            <div className="event-score-placeholder">
              {eventData.competition.name} - {eventData.event.name}
            </div>
          </div>
        </div>
        <div className="event-place-bet">
          <div className="event-place-bet-title">Place Bet</div>
          <div className="event-place-bet-content">
            {selectedBet && selectedMarketIndex !== null ? (
              <div className="place-bet-card">
                <div className="place-bet-odds-header">
                  <div className="place-bet-market-name" style={{fontSize: '14px', color: '#666', marginBottom: '8px'}}>
                    {selectedBet.market.name}
                  </div>
                  <div className="place-bet-odds-value" style={{
                    textAlign: 'center',
                    width: '100%',
                    color: selectedBet.odd.type === 'no' ? '#d32f2f' : '#1976d2',
                    fontWeight: 'bold',
                    fontSize: '18px'
                  }}>
                    {selectedBet.odd.type.toUpperCase()}: {selectedBet.odd.value}
                  </div>
                </div>
                <div className="place-bet-stake-grid" style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '8px',
                  margin: '16px 0'
                }}>
                  {[100, 500, 1000, 5000, 10000, 25000, 50000, 100000].map((amt, idx) => (
                    <button
                      key={idx}
                      className="place-bet-stake-btn"
                      style={{
                        padding: '8px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        background: '#f5f5f5',
                        cursor: 'pointer'
                      }}
                      onClick={() => setStake(amt)}
                    >+ {amt}</button>
                  ))}
                </div>
                <div className="place-bet-action-row" style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '8px',
                  marginBottom: '16px'
                }}>
                  <button className="place-bet-action-btn min" onClick={() => setStake(selectedBet.market.maxBet)}
                    style={{padding: '8px', background: '#e3f2fd', border: '1px solid #90caf9', borderRadius: '4px'}}>
                    MIN
                  </button>
                  <button className="place-bet-action-btn max" onClick={() => setStake(selectedBet.market.maxMarket)}
                    style={{padding: '8px', background: '#e8f5e9', border: '1px solid #a5d6a7', borderRadius: '4px'}}>
                    MAX
                  </button>
                  <button className="place-bet-action-btn edit" onClick={() => setStake('')}
                    style={{padding: '8px', background: '#fff3e0', border: '1px solid #ffcc80', borderRadius: '4px'}}>
                    EDIT
                  </button>
                  <button className="place-bet-action-btn clear" onClick={() => setStake('')}
                    style={{padding: '8px', background: '#fbe9e7', border: '1px solid #ffab91', borderRadius: '4px'}}>
                    CLEAR
                  </button>
                </div>
                <div className="place-bet-stake-input-row" style={{marginBottom: '16px'}}>
                  <input
                    type="number"
                    min={selectedBet.market.maxBet}
                    max={selectedBet.market.maxMarket}
                    placeholder="Enter stake amount"
                    value={stake}
                    onChange={e => setStake(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '16px'
                    }}
                  />
                </div>
                <div className="place-bet-minmax" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '14px',
                  color: '#666',
                  marginBottom: '16px'
                }}>
                  <div>Min Bet: {selectedBet.market.maxBet}</div>
                  <div>Max Bet: {selectedBet.market.maxMarket}</div>
                </div>
                <div className="place-bet-bottom-row" style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px'
                }}>
                  <button
                    className="place-bet-cancel"
                    onClick={() => { setSelectedBet(null); setStake(''); setSelectedMarketIndex(null); }}
                    style={{
                      padding: '12px',
                      background: '#f5f5f5',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    CANCEL
                  </button>
                  <button
                    className="place-bet-confirm"
                    style={{
                      padding: '12px',
                      background: '#2196f3',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
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
      </div>
      <BetsModal open={betsModalOpen} onClose={() => setBetsModalOpen(false)} />
    </div>
  );
};

export default EventDetailPage; 