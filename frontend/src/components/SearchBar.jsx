import React, { useState } from "react";
import "../styles/components/SearchBar.css";

const SearchBar = ({ onSearch, onReset }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleReset = () => {
    setQuery("");
    onReset(); // Appelle la fonction pour réinitialiser l'état
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search cocktails by name, ingredient, or category..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <button className="reset-button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default SearchBar;
