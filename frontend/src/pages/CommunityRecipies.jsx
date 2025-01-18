import React, { useState, useEffect } from "react";
import "../styles/pages/Community-Recipes.css";

const CommunityRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <h1>Community Recipes</h1>
      {loading ? (
        <p>Loading recipes...</p>
      ) : recipes.length > 0 ? (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="recipe-card">
              {recipe.image && (
                <img
                  src={`data:${recipe.imageType};base64,${Buffer.from(
                    recipe.image
                  ).toString("base64")}`}
                  alt={recipe.name}
                />
              )}
              <h2>{recipe.name}</h2>
              <p>
                <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
              </p>
              <p>
                <strong>Instructions:</strong> {recipe.instructions}
              </p>
              <p>
                <strong>Created By:</strong> {recipe.creator?.username || "Unknown"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No community recipes available.</p>
      )}
    </div>
  );
};

export default CommunityRecipes;
