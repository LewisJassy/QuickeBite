import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">QuickBite</div> {/* Make QuickBite a title, not a link */}
      <ul>
        <li><Link to="/">Home</Link></li> {/* Added Home link */}
        <li><Link to="/restaurants">Restaurants</Link></li>
        <li><Link to="/order">Order</Link></li>
        <li><Link to="/track">Track</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;