import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/Home.css';
function Home() {
  return (
    <div className="home-container">
      <h1>Bienvenue sur notre Application</h1>
      <p>Pour accéder à votre compte, veuillez vous connecter ou vous inscrire.</p>
      <div className="links">
        <Link to="/login" className="btn">Se connecter</Link>
        <Link to="/signup" className="btn">S'inscrire</Link>
      </div>
    </div>
  );
}

export default Home;
