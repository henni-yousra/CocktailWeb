import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/pages/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const response = await login(email, password);
  
    if (response.success) {
      const redirectPath = location.state?.from?.pathname || "/";
      navigate(redirectPath); // Redirige après une connexion réussie
    } else {
      setError(response.message); // Affiche l'erreur si la connexion échoue
    }
  };
  

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {location.state?.message && <p className="info">{location.state.message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
