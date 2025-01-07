import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/Login.css';
import '../styles/GlobalStyle.css';


function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Stocker le token
        //navigate('/account');
      } else {
        const data = await response.json();
        setError(data.message || 'Échec de la connexion.');
      }
    } catch (err) {
      setError('Impossible de se connecter au serveur.');
    }
  };

  return (
    <div>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} required />
        <button type="submit">Se connecter</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p> Pas de compte? <a href='/signup'>Inscrivez-vous</a></p>

    </div>
    
  );
}

export default Login;
