import React from 'react';
import '../styles/components/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Cocktail Finder</div>
      <ul className="navbar-links">
        <a href='/'><li>Accueil</li></a>
        <a href='/login'><li>Connexion</li></a>
      </ul>
    </nav>
  );
}

export default Navbar;