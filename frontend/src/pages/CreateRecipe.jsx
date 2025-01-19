import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/pages/CreateRecipe.css";

const CreateRecipe = () => {
  const { user } = useAuth();
  const [recipe, setRecipe] = useState({ name: "", ingredients: "", steps: "" });
  const [recipes, setRecipes] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUserCocktails = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("You must be logged in to view your cocktails.");
        return;
      }

      try {
        const response = await fetch("/api/cocktails/myCocktails", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cocktails.");
        }

        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching user's cocktails:", error);
        alert("Failed to fetch cocktails.");
      }
    };

    if (user) {
      fetchUserCocktails();
    }
  }, [user]);

  // Handle recipe creation
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
      creator: user.id,
      source: "community",
    };

    try {
      const response = await fetch("/api/cocktails/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to create the recipe.");
      }

      const responseData = await response.json();
      setRecipes([...recipes, responseData]);
      setRecipe({ name: "", ingredients: "", steps: "" });
      setSuccess(true);
    } catch (error) {
      console.error("Error creating recipe:", error);
      alert("Failed to create the recipe.");
      setSuccess(false);
    }
  };


  const handleDelete = async (id) => {
    const token = localStorage.getItem("authToken");
    console.log("Deleting cocktail with ID:", id);
    console.log("Authorization token:", token);
  
    if (!token) {
      alert("You must be logged in to delete a recipe.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8080/api/cocktails/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete the recipe. Status: ${response.status}`);
      }
  
      setRecipes(recipes.filter((recipe) => recipe._id !== id));
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Failed to delete the recipe.");
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
        <>
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

          {success && <div className="success-message">Recipe created successfully!</div>}

          <h3>Your Created Cocktails</h3>
          <div className="recipe-list">
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <div key={recipe._id} className="recipe-card">
                  <h4>{recipe.name}</h4>
                  <p>
                    <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
                  </p>
                  <p>
                    <strong>Steps:</strong> {recipe.instructions}
                  </p>
                  <button onClick={() => handleDelete(recipe._id)}>Delete</button>
                </div>
              ))
            ) : (
              <p>No recipes created yet.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CreateRecipe;
