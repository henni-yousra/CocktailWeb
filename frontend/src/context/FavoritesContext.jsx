import React, { createContext, useContext, useState, useEffect } from "react";

// Créer le contexte des favoris
const FavoritesContext = createContext();

// Hook pour utiliser le contexte
export const useFavorites = () => useContext(FavoritesContext);

// Fournisseur de contexte
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  // Sauvegarde des favoris dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Ajouter un cocktail aux favoris
  const addToFavorites = (cocktail) => {
    if (!favorites.some((fav) => fav.idDrink === cocktail.idDrink)) {
      setFavorites([...favorites, cocktail]);
    }
  };

  // Supprimer un cocktail des favoris
  const removeFromFavorites = (idDrink) => {
    setFavorites(favorites.filter((fav) => fav.idDrink !== idDrink));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
