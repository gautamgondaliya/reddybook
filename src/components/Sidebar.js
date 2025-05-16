import React, { useState } from 'react';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

const categories = [
  { label: 'Multi Market', icon: '🔔' },
  { label: 'Cricket', icon: '🏏' },
  { label: 'Football', icon: '⚽' },
  { label: 'Tennis', icon: '🎾' },
  { label: 'Sports Book', icon: '🛡️' },
  { label: 'Matka', icon: '🎯' },
  { label: 'Cricket Fight', icon: '🏏' },
  { label: 'Casino', icon: '🎰' },
  { label: 'Evolution', icon: '🏛️' },
  { label: 'FIFA CUP WINNER', icon: '🏆' },
  { label: 'WINNER CUP', icon: '🥇' },
];

const Sidebar = ({ onCategorySelect }) => {
  const [active, setActive] = useState('Multi Market');
  const navigate = useNavigate();
  return (
    <aside className="rb-sidebar">
      <ul className="rb-sidebar-list">
        {categories.map(cat => (
          <li
            key={cat.label}
            className={`rb-sidebar-item${active === cat.label ? ' active' : ''}`}
            onClick={() => {
              setActive(cat.label);
              if (onCategorySelect) onCategorySelect(cat.label);
              navigate('/');
            }}
          >
            <span className="rb-sidebar-icon">{cat.icon}</span>
            <span>{cat.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar; 