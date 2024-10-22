import React from 'react';
import './Homepage.css';

const Homepage = () => {
  return (
    <div
      className="hero"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/header_img.png)`, // Correctly referencing image in the public folder
      }}
    >
      <div className="container">
        <h1>QuickBite</h1>
        <p>Fast and Delicious Food Delivered to You</p>
      </div>
    </div>
  );
};

export default Homepage;