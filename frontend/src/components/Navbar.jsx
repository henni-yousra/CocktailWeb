import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/components/Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <h1>
        <a href="/" className="logo-link">
          <img src="../../public/cocktail-default-removebg-preview.png" alt="Cocktail Explorer Logo" className="logo-image" />
        </a>
      </h1>
      <ul className="navbar-links">
        {user && (
          <>
            <li>
              <Link to="/favorites">Favorites</Link>
            </li>
            <li>
              <Link to="/create-recipe">Create Recipe</Link>
            </li>
            <li>
              <a href="/community-recipes">Community Recipes</a>
            </li>
          </>
        )}
      </ul>
      <div className="auth-actions">
        {user ? (
          <>
            <button onClick={logout} className="auth-button">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="auth-button">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
