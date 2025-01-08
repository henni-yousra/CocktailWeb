import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import './styles/App.css'
import Dashboard from './pages/Dashboard';
import CreateCocktail from './pages/CreateCocktail';
import CocktailSearch from './pages/CocktailSearch';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateCocktail />} />
        <Route path="/search" element={<CocktailSearch />} />
      </Routes>
    </Router>
  );
}

export default App;
