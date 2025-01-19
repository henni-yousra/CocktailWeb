import React, { useState, useEffect } from "react";
import "../styles/pages/Community-Recipes.css";
import CocktailModal from "../components/CocktailModal";
import CocktailCard from "../components/CocktailCard";


const CommunityRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCocktail, setSelectedCocktail] = useState(null);

  useEffect(() => {
    const fetchCommunityRecipes = async () => {
      try {
        const response = await fetch("/api/cocktails/community");
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching community recipes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCommunityRecipes();
  }, []);

  return (
    <div className="community-recipes container">
      <h2>Community Recipes</h2>
      {loading ? (
        <p>Loading recipes...</p>
      ) : recipes.length > 0 ? (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <CocktailCard
              key={recipe.id}
              cocktail={recipe}
              onClick={setSelectedCocktail}
            />
          ))}
        </div>
      ) : (
        <p>No community recipes available.</p>
      )}
      <CocktailModal
        cocktail={selectedCocktail}
        onClose={() => setSelectedCocktail(null)}
      />
    </div>
  );
};

export default CommunityRecipes;