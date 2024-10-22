import React from 'react';
import './Hero.css'; // Import your CSS for Hero styling

const Hero = ({ title }) => {
  return (
    <div
      className="hero"
      style={{
        backgroundImage: `url('/header_img.png')`, // Set your background image 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        marginTop: '80px', // Adjust this value to fit your navbar height
      }}
    >
      <h1>{title}</h1> {/* Display the title */}
    </div>
  );
};

export default Hero;
  