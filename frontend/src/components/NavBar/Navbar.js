// frontend/src/components/NavBar/Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from '../../contexts/AuthContext';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext); // Consume AuthContext

  return (
    <nav className="navbar">
      <div className="navbar-logo">QuickBite</div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/restaurants">Restaurants</Link></li>
        <li><Link to="/order">Order</Link></li>
        <li><Link to="/track">Track</Link></li>
        {user ? (
          <>
            <li><Link to="/">Homepage</Link></li>
            <li><button onClick={logoutUser} className="logout-button">Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;