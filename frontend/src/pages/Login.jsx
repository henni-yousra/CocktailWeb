import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/pages/Login.css';
import '../styles/GlobalStyle.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Échec de la connexion');
        console.error('Erreur de réponse:', errorData);
        return;
      }

      const data = await response.json();
      navigate('/dashboard');
    } catch (err) {
      setError('Une erreur est survenue');
      console.error('Erreur de fetch:', err);
    }
  };

  return (
    <div className="login">
      <h2>Connexion</h2>
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
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Connexion</button>
      </form>
      <p>Vous n'avez pas de compte? <Link to="/signup">Inscrivez-vous</Link></p>
    </div>
  );
};

export default Login;