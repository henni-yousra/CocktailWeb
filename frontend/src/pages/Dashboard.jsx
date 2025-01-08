import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Top Navigation Bar */}
      <nav className="navbar">
        <h2> </h2>

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
