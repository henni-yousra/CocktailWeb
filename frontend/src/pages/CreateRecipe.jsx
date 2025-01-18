import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/pages/CreateRecipe.css";

const CreateRecipe = () => {
  const { user } = useAuth(); // Verify if the user is logged in
  const [recipe, setRecipe] = useState({ name: "", ingredients: "", steps: "" });
  const [recipes, setRecipes] = useState([]); // Local list of created recipes

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You must be logged in to create a recipe.");
      return;
    }

    const payload = {
      name: recipe.name,
      ingredients: recipe.ingredients.split(",").map((item) => item.trim()),
      instructions: recipe.steps,
      creator: user.id, // Use logged-in user's ID
      source: "community", // Set source to "community"
    };

    console.log("Payload:", payload);

    try {
      const response = await fetch("/api/cocktails/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send the token in headers
        },
        body: JSON.stringify(payload), // Send JSON payload
      });

      if (!response.ok) {
        throw new Error("Failed to create the recipe. Status: " + response.status);
      }

      const responseData = await response.json(); // Read the response once
      console.log("Response Data:", responseData);
      
      setRecipes([...recipes, responseData]); // Add new recipe to local list
      setRecipe({ name: "", ingredients: "", steps: "" }); // Reset the form
    } catch (error) {
      console.error("Error creating recipe:", error);
      alert("Failed to create the recipe. Please try again.");
    }
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

    </div>
  );
};

export default CreateRecipe;
