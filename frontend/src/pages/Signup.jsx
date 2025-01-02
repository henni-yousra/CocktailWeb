import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {  // Use correct URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
        const errorData = await response.json();  // Assume JSON error message
        setError(errorData.message || 'Signup failed');
        console.error('Error response:', errorData);  // Log the error for debugging
        return;
      }

      const data = await response.json();  // Now parse the JSON
      navigate('/login');  // Redirect to login page on success
    } catch (err) {
      setError('An error occurred');
      console.error('Fetch error:', err);  // Log to the console for debugging
    }
  };

  return (
    <div className="signup">
      <h2>Signup</h2>
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
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
