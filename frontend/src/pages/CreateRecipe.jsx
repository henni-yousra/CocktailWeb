import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/pages/CreateRecipe.css";

const CreateRecipe = () => {
  const { user } = useAuth(); // Vérifie si l'utilisateur est connecté
  const [recipe, setRecipe] = useState({ name: "", ingredients: "", steps: "" });
  const [recipes, setRecipes] = useState([]); // Liste locale des recettes créées

  // Gère la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to create a recipe.");
      return;
    }

    const newRecipe = {
      id: Date.now(),
      ...recipe,
    };

    setRecipes([...recipes, newRecipe]); // Ajoute la recette à la liste locale
    setRecipe({ name: "", ingredients: "", steps: "" }); // Réinitialise le formulaire
  };

  return (
    <div className="create-recipe container">
      <h2>Create Your Own Cocktail</h2>
      {!user ? (
        <p className="warning">
          You must be logged in to create a recipe. Please log in to continue.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Cocktail Name"
            value={recipe.name}
            onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
            required
          />
          <textarea
            placeholder="Ingredients (comma separated)"
            value={recipe.ingredients}
            onChange={(e) =>
              setRecipe({ ...recipe, ingredients: e.target.value })
            }
            required
          />
          <textarea
            placeholder="Steps to prepare"
            value={recipe.steps}
            onChange={(e) => setRecipe({ ...recipe, steps: e.target.value })}
            required
          />
          <button type="submit">Save Recipe</button>
        </form>
      )}
      <div className="recipes-list">
        <h3>Your Created Recipes:</h3>
        {recipes.length > 0 ? (
          <ul>
            {recipes.map((recipe) => (
              <li key={recipe.id}>
                <strong>{recipe.name}</strong>: {recipe.ingredients}
              </li>
            ))}
          </ul>
        ) : (
          <p>No recipes created yet.</p>
        )}
      </div>
    </div>
  );
};

export default CreateRecipe;
