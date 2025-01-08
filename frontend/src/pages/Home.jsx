import React, { useState, useEffect } from 'react';
import '../styles/pages/Home.css';
import '../styles/GlobalStyle.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchFilterBar from '../components/SearchFilterBar';
import CocktailList from '../components/CocktailList';
import CocktailModal from '../components/CocktailModal';

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

  // Etat pour les favoris
  const [favorites, setFavorites] = useState([]);

  // Charger tous les cocktails au départ
  useEffect(() => {
    setFilteredCocktails(data); 
  }, []);

  // Fonction de filtrage globale
  const filterCocktails = (category, query) => {
    let filtered = category === 'all'
      ? [...data]
      : data.filter((cocktail) => cocktail.category === category);

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

    const newFiltered = filterCocktails(newCategory, searchQuery);
    setFilteredCocktails(newFiltered);
  };

  // Quand on tape dans la barre de recherche
  const handleSearchQueryChange = (e) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);

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

  // Ajouter/retirer un cocktail des favoris
  const handleToggleFavorite = (cocktail) => {
    const isFavorite = favorites.some((fav) => fav.id === cocktail.id);
    if (isFavorite) {
      setFavorites((prev) => prev.filter((f) => f.id !== cocktail.id));
    } else {
      setFavorites((prev) => [...prev, cocktail]);
    }
  };

  const isFavoriteCocktail = (cocktailId) => {
    return favorites.some((fav) => fav.id === cocktailId);
  };


  return (
    <div className="home-container">
      <Navbar />

      {/* Contenu principal (scrollable) */}
      <div className="content">
        <header className="home-header">
          <h1>Trouvez le cocktail parfait pour toutes les occasions !</h1>
        </header>

        {/* Barre de filtre + Barre de recherche */}
        <SearchFilterBar
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          searchQuery={searchQuery}
          onSearchQueryChange={handleSearchQueryChange}
        />

        {/* Liste des cocktails filtrés */}
        <CocktailList
          cocktails={filteredCocktails}
          onCardClick={handleCardClick}
          onToggleFavorite={handleToggleFavorite}
          isFavoriteCocktail={isFavoriteCocktail}
        />
      </div>

      <Footer />

      {/* Modal pour afficher les détails du cocktail */}
      <CocktailModal 
        selectedCocktail={selectedCocktail}
        onClose={closeModal}
      />
    </div>
  );
}

export default Home;