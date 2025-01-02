import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Cocktail Web</h1>
      <p>To access your account, please log in or sign up.</p>
      <div className="links">
        <Link to="/login" className="btn">Log In</Link>
        <Link to="/signup" className="btn">Sign Up</Link>
      </div>
    </div>
  );
}

export default Home;
