import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/pages/CreateRecipe.css";

const CreateRecipe = () => {
  const { user } = useAuth(); // Vérifie si l'utilisateur est connecté
  const [recipe, setRecipe] = useState({ name: "", ingredients: "", steps: "" });
  const [recipes, setRecipes] = useState([]); // Liste locale des cocktails
  const [success, setSuccess] = useState(false); // Suivi du succès de la création

  // Charger les cocktails créés par l'utilisateur
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
            Authorization: `Bearer ${token}`, // Envoie le token dans les headers
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cocktails. Status: " + response.status);
        }

        const data = await response.json(); // Récupère les cocktails
        setRecipes(data); // Met à jour l'état local
      } catch (error) {
        console.error("Error fetching user's cocktails:", error);
        alert("Failed to fetch cocktails. Please try again.");
      }
    };

    if (user) {
      fetchUserCocktails(); // Appelle la fonction si l'utilisateur est connecté
    }
  }, [user]); // Exécute l'effet lorsque l'utilisateur change

  // Gestion de la création de recette
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
      creator: user.id, // Utilise l'ID de l'utilisateur connecté
      source: "community", // Définit la source comme "community"
    };

    try {
      const response = await fetch("/api/cocktails/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Envoie le token dans les headers
        },
        body: JSON.stringify(payload), // Envoie le payload JSON
      });

      if (!response.ok) {
        throw new Error("Failed to create the recipe. Status: " + response.status);
      }

      const responseData = await response.json(); // Lit la réponse une fois
      setRecipes([...recipes, responseData]); // Ajoute la nouvelle recette à la liste locale
      setRecipe({ name: "", ingredients: "", steps: "" }); // Réinitialise le formulaire
      setSuccess(true); // Définit le succès sur vrai
    } catch (error) {
      console.error("Error creating recipe:", error);
      alert("Failed to create the recipe. Please try again.");
      setSuccess(false); // Définit le succès sur faux en cas d'erreur
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

          {success && (
            <div className="success-message">Recipe created successfully!</div>
          )}

          <h3>Your Created Cocktails</h3>
          <div className="recipe-list">
            {recipes.length > 0 ? (
              recipes.map((recipe, index) => (
                <div key={index} className="recipe-card">
                  <h4>{recipe.name}</h4>
                  <p>
                    <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
                  </p>
                  <p>
                    <strong>Steps:</strong> {recipe.instructions}
                  </p>
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
