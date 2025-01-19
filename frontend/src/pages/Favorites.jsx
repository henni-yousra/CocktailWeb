import React, {useState} from "react";
import { useFavorites } from "../context/FavoritesContext";
import CocktailCard from "../components/CocktailCard";
import "../styles/pages/Favorites.css";
import CocktailModal from "../components/CocktailModal";

const Favorites = () => {
  const { favorites } = useFavorites();
  const [selectedCocktail, setSelectedCocktail] = useState(null);

  return (
    <div className="favorites container">
      <h2>Your Favorite Cocktails</h2>
      {favorites.length > 0 ? (
        <div className="favorites-grid">
          {favorites.map((cocktail) => (
            <CocktailCard
              key={cocktail.id}
              cocktail={cocktail}
              onClick={setSelectedCocktail}
            />
          ))}
        </div>
      ) : (
        <p className="no-favorites">You have no favorite cocktails yet. Start adding some!</p>
      )}
      <CocktailModal
        cocktail={selectedCocktail}
        onClose={() => setSelectedCocktail(null)}
      />
    </div>
  );
};

export default Favorites;
