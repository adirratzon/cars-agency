import React from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-icons">
        <button 
          className="icon-button" 
          aria-label="פרופיל משתמש" 
          onClick={() => navigate('/login')}
        >
          <span role="img" aria-hidden="true">👤</span>
        </button>
        <button className="icon-button" aria-label="רכבים שאהבתי">
          <span role="img" aria-hidden="true">❤️</span>
        </button>
      </div>
      <ul className="navbar-links">
        <li><a href="#">בית</a></li>
        <li><a href="#">רכבים</a></li>
        <li><a href="#">בדיקת מימון</a></li>
        <li><a href="#">אודות</a></li>
        <li><a href="#">צור קשר</a></li>
      </ul>
      <div className="navbar-logo">
        <img src={logo} alt="Shuki Car Agency Logo" className="logo-image" />
      </div>
    </nav>
  );
};

export default Navbar;
