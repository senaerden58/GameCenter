import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; 
import "../styles/Slider.css";

const Navbar = () => {
  return (
    <nav className="navbar">
        <img className="navbar-img" src="/images/NavbarLogo.png" alt="logo" />
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            Ana Sayfa
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/games" className="navbar-link">
            Games
          </Link>
         
        </li>
        <li className="navbar-item">
          <Link to="/login" className="navbar-link">
            Login
            
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
