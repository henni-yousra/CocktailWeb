import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Top Navigation Bar */}
      <nav className="navbar">
        <h2>CocktailWeb</h2>
        <ul>
          <li><Link to="/search">Search Cocktails</Link></li>
          <li><Link to="/favorites">Favorites</Link></li>
          <li><Link to="/customize">Customize Recipes</Link></li>
        </ul>
        <Link to="/login" className="logout-button">Logout</Link>
      </nav>

      {/* Main Content */}
      <div className="content">
        {/* Add your Routes or other content here */}
      </div>
    </div>
  );
};

export default Dashboard;
