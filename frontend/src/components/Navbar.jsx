import React from 'react';
import '../styles/components/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand"><a href='/'>Cocktail Finder</a></div>
      <ul className="navbar-links">
        <a href='/login'><li>Connexion</li></a>
        <a href='/create'><li>Ajouter une recette</li></a>
      </ul>
    </nav>
  );
}

export default Navbar;
