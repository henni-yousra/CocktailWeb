import React, { useState } from 'react';
import '../styles/pages/Home.css';
function Home() {

  const [searchType, setSearchType] = useState('name'); // 'name', 'ingredient', 'category'
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setResults([]);

    if (!searchQuery.trim()) {
      setError('Veuillez entrer une recherche valide.');
      return;
    }

    try {
      const response = await fetch(`/api/cocktails?${searchType}=${searchQuery}`);
      if (response.ok) {
        const data = await response.json();
        setResults(data.cocktails || []);
      } else {
        setError('Aucun cocktail trouvé.');
      }
    } catch (err) {
      setError('Erreur lors de la récupération des cocktails.');
    }
  };

  return (
    <div className="cocktail-search-container">
      <h1>Recherche de Cocktails</h1>
      <form onSubmit={handleSearch} className="search-form">
        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="name">Nom</option>
          <option value="ingredient">Ingrédient</option>
          <option value="category">Catégorie</option>
        </select>
        <input
          type="text"
          placeholder={`Rechercher par ${searchType}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          required
        />
        <button type="submit">Rechercher</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <div className="results">
        {results.length > 0 &&
          results.map((cocktail, index) => (
            <div key={index} className="cocktail-card">
              <img src={cocktail.image} alt={cocktail.name} />
              <h2>{cocktail.name}</h2>
              <p>{cocktail.category}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
