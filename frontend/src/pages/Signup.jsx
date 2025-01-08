import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/pages/Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Échec de l\'inscription');
        console.error('Erreur de réponse:', errorData);
        return;
      }

      const data = await response.json();
      navigate('/login');
    } catch (err) {
      setError('Une erreur est survenue');
      console.error('Erreur de fetch:', err);
    }
  };

  return (
    <div className="signup">
      <h2>Inscription</h2>
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
        <button type="submit">S'inscrire</button>
      </form>
      <p>Vous avez déjà un compte? <Link to="/login">Connectez-vous ici</Link></p>
    </div>
  );
};

export default Signup;
