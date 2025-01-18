import React, { useState, useEffect } from "react";
import "../styles/pages/Community-Recipes.css";

const defaultImage = "/cocktail-default.png"; 

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
      <h2>Community Recipes</h2>
      {loading ? (
        <p>Loading recipes...</p>
      ) : recipes.length > 0 ? (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="card">
              <img
                src={defaultImage} // Display the default image
                alt={recipe.name}
              />
              <div className="titles">
                <h3 className="title">{recipe.name}</h3>

              </div>
              <div className="instructions">
                <p>
                  <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
                </p>
                <p>
                  <strong>Instructions:</strong> {recipe.instructions}
                </p>
                <br />
                <p>
                  <strong>Created By:</strong> {recipe.creator ? recipe.creator.username : "unknown"}
                </p>
              </div>
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
