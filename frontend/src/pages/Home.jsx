import React, { useState, useEffect } from 'react';
import '../styles/pages/Home.css';

function Home() {
  // Données initiales
  const data = [
    {
      id: 1,
      name: 'Mojito',
      category: 'cocktail',
      image: 'https://www.thecocktaildb.com/images/media/drink/3z6xdi1589574603.jpg',
      instructions:
        'Mélanger le rhum, le jus de citron vert, le sucre et la menthe. Ajouter de la glace et compléter avec de l’eau gazeuse.',
    },
    {
      id: 2,
      name: 'Margarita',
      category: 'cocktail',
      image: 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
      instructions:
        'Secouer la tequila, le triple sec et le jus de citron vert dans un shaker avec de la glace. Servir dans un verre givré au sel.',
    },
    {
      id: 3,
      name: 'Martini',
      category: 'cocktail',
      image: 'https://www.thecocktaildb.com/images/media/drink/71t8581504353095.jpg',
      instructions:
        'Mélanger le gin et le vermouth dans un verre à mélange avec des glaçons, puis verser dans un verre à Martini.',
    },
    {
      id: 4,
      name: 'Gin Tonic',
      category: 'cocktail',
      image: 'https://www.thecocktaildb.com/images/media/drink/z0omyp1582480573.jpg',
      instructions:
        'Verser le gin sur des glaçons, compléter avec du tonic, et ajouter une rondelle de citron.',
    },
    // Ajoutez autant de cocktails que vous le souhaitez
  ];

  // État pour la liste de cocktails filtrés (affichés)
  const [filteredCocktails, setFilteredCocktails] = useState([]);
  
  // État pour la recherche par nom
  const [searchQuery, setSearchQuery] = useState('');

  // État pour la catégorie sélectionnée : "all" ou "cocktail"
  const [selectedCategory, setSelectedCategory] = useState('all');

  // État pour la modal (cocktail sélectionné)
  const [selectedCocktail, setSelectedCocktail] = useState(null);

  // Charger tous les cocktails au départ
  useEffect(() => {
    setFilteredCocktails(data); 
  }, []);

  // Fonction de filtrage globale
  const filterCocktails = (category, query) => {
    // Filtrage initial : si category = "all", on part de tous, sinon on filtre
    let filtered = category === 'all'
      ? [...data] // on prend la liste complète
      : data.filter((cocktail) => cocktail.category === category);

    // Filtrer par nom (si searchQuery n'est pas vide)
    if (query.trim()) {
      filtered = filtered.filter((cocktail) =>
        cocktail.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    return filtered;
  };

  // Quand on change la catégorie
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);

    // On recalcule la liste filtrée
    const newFiltered = filterCocktails(newCategory, searchQuery);
    setFilteredCocktails(newFiltered);
  };

  // Quand on tape dans la barre de recherche
  const handleSearchQueryChange = (e) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);

    // On recalcule la liste filtrée
    const newFiltered = filterCocktails(selectedCategory, newQuery);
    setFilteredCocktails(newFiltered);
  };

  // Ouverture de la modal au clic sur une carte
  const handleCardClick = (cocktail) => {
    setSelectedCocktail(cocktail);
  };

  // Fermeture de la modal
  const closeModal = () => {
    setSelectedCocktail(null);
  };

  return (
    <div className="home-container">
      {/* Navbar fixe (optionnelle) */}
      <nav className="navbar">
        <div className="navbar-brand">Cocktail</div>
        {/* Ici, si tu veux un menu ou des liens */}
        <ul className="navbar-links">
          <a href='/'><li>Accueil</li></a>
          <a href='/login'><li>Connexion</li></a>
        </ul>
      </nav>

      {/* Contenu principal (scrollable) */}
      <div className="content">
        <header className="home-header">
          <h1>Trouvez le cocktail parfait pour toutes les occasions !</h1>
        </header>

        {/* Barre de filtre + Barre de recherche */}
        <section className="search-section">
          <div className="filters">
            <label htmlFor="category-select">Filtrer par catégorie :</label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
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
              onChange={handleSearchQueryChange}
            />
          </div>
        </section>

        {/* Liste des cocktails filtrés */}
        <section className="results-section">
          <div className="results">
            {filteredCocktails && filteredCocktails.length > 0 ? (
              filteredCocktails.map((cocktail) => (
                <div
                  key={cocktail.id}
                  className="cocktail-card"
                  onClick={() => handleCardClick(cocktail)}
                >
                  <img src={cocktail.image} alt={cocktail.name} />
                  <h2>{cocktail.name}</h2>
                  <p>{cocktail.category}</p>
                </div>
              ))
            ) : (
              <p>Aucun cocktail à afficher.</p>
            )}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="home-footer">
        <p>&copy; 2025 Cocktail. Tous droits réservés.</p>
      </footer>

      {/* Modal pour afficher les détails du cocktail */}
      {selectedCocktail && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>
            <img src={selectedCocktail.image} alt={selectedCocktail.name} />
            <h2>{selectedCocktail.name}</h2>
            <p>
              <strong>Catégorie : </strong>
              {selectedCocktail.category}
            </p>
            <p>
              <strong>Instructions : </strong>
              {selectedCocktail.instructions}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
