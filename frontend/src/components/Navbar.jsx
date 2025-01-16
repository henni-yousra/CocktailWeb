import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/components/Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <h1>Cocktail Explorer</h1>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        {user && (
          <>
            <li>
              <Link to="/favorites">Favorites</Link>
            </li>
            <li>
              <Link to="/create-recipe">Create Recipe</Link>
            </li>
          </>
        )}
      </ul>
      <div className="auth-actions">
        {user ? (
          <>
            {/* <span className="username"></span> */}
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
