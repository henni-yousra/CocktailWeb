// import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import "../styles/pages/CreateRecipe.css";

// const CreateRecipe = () => {
//   const { user } = useAuth(); // Vérifie si l'utilisateur est connecté
//   const [recipe, setRecipe] = useState({ name: "", ingredients: "", steps: "" });
//   const [recipes, setRecipes] = useState([]); // Liste locale des recettes créées

//   // Gère la soumission du formulaire
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!user) {
//       alert("You must be logged in to create a recipe.");
//       return;
//     }

//     const newRecipe = {
//       id: Date.now(),
//       ...recipe,
//     };

//     setRecipes([...recipes, newRecipe]); // Ajoute la recette à la liste locale
//     setRecipe({ name: "", ingredients: "", steps: "" }); // Réinitialise le formulaire
//   };

//   return (
//     <div className="create-recipe container">
//       <h2>Create Your Own Cocktail</h2>
//       {!user ? (
//         <p className="warning">
//           You must be logged in to create a recipe. Please log in to continue.
//         </p>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Cocktail Name"
//             value={recipe.name}
//             onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
//             required
//           />
//           <textarea
//             placeholder="Ingredients (comma separated)"
//             value={recipe.ingredients}
//             onChange={(e) =>
//               setRecipe({ ...recipe, ingredients: e.target.value })
//             }
//             required
//           />
//           <textarea
//             placeholder="Steps to prepare"
//             value={recipe.steps}
//             onChange={(e) => setRecipe({ ...recipe, steps: e.target.value })}
//             required
//           />
//           <button type="submit">Save Recipe</button>
//         </form>
//       )}
//       <div className="recipes-list">
//         <h3>Your Created Recipes:</h3>
//         {recipes.length > 0 ? (
//           <ul>
//             {recipes.map((recipe) => (
//               <li key={recipe.id}>
//                 <strong>{recipe.name}</strong>: {recipe.ingredients}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No recipes created yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CreateRecipe;


import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/pages/CreateRecipe.css";

const API_URL = import.meta.env.VITE_API_URL;


const CreateRecipe = () => {
  const { user } = useAuth(); // Vérifie si l'utilisateur est connecté
  const [recipe, setRecipe] = useState({ name: "", ingredients: "", steps: "" });
  const [image, setImage] = useState(null); // Stocker l'image
  const [recipes, setRecipes] = useState([]); // Liste locale des recettes créées

  // Gère la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to create a recipe.");
      return;
    }

    // Créer le payload avec FormData pour inclure l'image
    const formData = new FormData();
    formData.append("name", recipe.name);
    formData.append("ingredients", recipe.ingredients);
    formData.append("instructions", recipe.steps);
    formData.append("creator", user.id); // Ajoute l'auteur
    if (image) {
      formData.append("image", image);
    }

    try {
      // Envoyer les données au backend
      const response = await fetch("localhost:/api/cocktails", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "method": "POST",
        },
      });

      // Ajouter la nouvelle recette à la liste locale
      setRecipes([...recipes, response.data]);
      setRecipe({ name: "", ingredients: "", steps: "" }); // Réinitialise le formulaire
      setImage(null); // Réinitialise l'image
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
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])} // Stocke le fichier dans l'état
          />
          <button type="submit">Save Recipe</button>
        </form>
      )}
      <div className="recipes-list">
        <h3>Your Created Recipes:</h3>
        {recipes.length > 0 ? (
          <ul>
            {recipes.map((recipe) => (
              <li key={recipe._id}>
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
