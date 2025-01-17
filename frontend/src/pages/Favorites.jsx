import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import CocktailCard from "../components/CocktailCard";
import "../styles/pages/Favorites.css";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="favorites container">
      <h2>Your Favorite Cocktails</h2>
      {favorites.length > 0 ? (
        <div className="favorites-grid">
          {favorites.map((cocktail) => (
            <CocktailCard
              key={cocktail.id}
              cocktail={cocktail}
              onClick={() => {}}
            />
          ))}
        </div>
      ) : (
        <p className="no-favorites">You have no favorite cocktails yet. Start adding some!</p>
      )}
    </div>
  );
};

export default Favorites;
