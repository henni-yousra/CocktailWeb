import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/components/CocktailCard.css";

const CocktailCard = ({ cocktail, onClick }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const { user } = useAuth();
  const navigate = useNavigate();

  const isFavorite = favorites.some((fav) => fav.idDrink === cocktail.idDrink);

  const toggleFavorite = () => {
    if (!user) {
      alert("You must be logged in to add favorites.");
      return;
    }

    if (isFavorite) {
      removeFromFavorites(cocktail.idDrink);
    } else {
      addToFavorites(cocktail);
    }
  };

  return (
    <div className="cocktail-card" onClick={() => onClick(cocktail)}>
      <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
      <h3>{cocktail.strDrink}</h3>
      <button
        title={isFavorite ? "Click to remove from favorites" : "Click to add to favorites"}
        className={`favorite-button ${isFavorite ? "favorited" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite();
        }}
      >
        {isFavorite ? (
          <>
            <span className="icon">❤️</span>
          </>
        ) : (
          <>
            <span className="icon">♡</span>
          </>
        )}
      </button>

    </div>
  );
};

export default CocktailCard;
