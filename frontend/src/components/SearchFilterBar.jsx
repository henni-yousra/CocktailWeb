import React from 'react';
import '../styles/components/SearchFilterBar.css';

function SearchFilterBar({
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchQueryChange
}) {
  return (
    <section className="search-section">
      <div className="filters">
        <label htmlFor="category-select">Filtrer par catégorie :</label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={onCategoryChange}
        >
          <option value="all">All</option>
          <option value="cocktail">Cocktail</option>
          {/* On pourra ajouter d'autres catégories plus tard */}
        </select>
      </div>

      <div className="search-bar">
        <label htmlFor="search-input">Rechercher par nom :</label>
        <input
          id="search-input"
          type="text"
          placeholder="Ex: Mojito..."
          value={searchQuery}
          onChange={onSearchQueryChange}
        />
      </div>
    </section>
  );
}

export default SearchFilterBar;
