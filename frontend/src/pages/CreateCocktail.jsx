import React, { useState } from 'react';
import '../styles/pages/CreateCocktail.css';

function CreateCocktail() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    isAlcoholic: 'alcoholic', 
    alcoholType: '',
    ingredients: [{ name: '', quantity: '' }],
    instructions: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index][name] = value;
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { name: '', quantity: '' }],
    });
  };

  const removeIngredient = (index) => {
    const updatedIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!formData.name || !formData.instructions || formData.ingredients.length === 0) {
      setErrorMessage('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    if (formData.isAlcoholic === 'alcoholic' && !formData.alcoholType) {
      setErrorMessage('Veuillez sélectionner un type d’alcool.');
      return;
    }

    try {
      const response = await fetch('localhost:3000:/api/cocktails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('Votre recette a été sauvegardée avec succès !');
        setFormData({
          name: '',
          category: '',
          isAlcoholic: 'alcoholic',
          alcoholType: '',
          ingredients: [{ name: '', quantity: '' }],
          instructions: '',
        });
      } else {
        setErrorMessage('Erreur lors de la sauvegarde de votre recette.');
      }
    } catch (error) {
      setErrorMessage('Impossible de se connecter au serveur.');
    }
  };

  return (
    <div className="create-cocktail-container">
      <h1>Créer une Recette de Cocktail</h1>
      <form onSubmit={handleSubmit} className="create-cocktail-form">
        <input
          type="text"
          name="name"
          placeholder="Nom du cocktail"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {/* <div>
          <label>Catégorie :
            <select
              value={formData.category}
              onChange={handleChange}
              name="category"
              required
            >
            <option value="">-- Sélectionnez une catégorie --</option>
              <option value="classique">classique</option>
              <option value="tropical">tropical</option>
            </select>
          </label>
        </div> */}
       

        <div>
          <label>
            Type de cocktail :
            <select
              name="isAlcoholic"
              value={formData.isAlcoholic}
              onChange={handleChange}
              required
            >
              <option value="alcoholic">Alcoolisé</option>
              <option value="non-alcoholic">Sans alcool</option>
            </select>
          </label>
        </div>

        {/* Champ conditionnel pour sélectionner l'alcool */}
        {formData.isAlcoholic === 'alcoholic' && (
          <div>
            <label>
              Type d’alcool :
              <select
                name="alcoholType"
                value={formData.alcoholType}
                onChange={handleChange}
                required
              >
                <option value="">-- Sélectionnez un type d’alcool --</option>
                <option value="gin">Gin</option>
                <option value="vodka">Vodka</option>
                <option value="rhum">Rhum</option>
                <option value="other">Autre</option>
              </select>
            </label>
          </div>
        )}

        <h2>Ingrédients</h2>
        {formData.ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-row">
            <input
              type="text"
              name="name"
              placeholder="Ingrédient"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, e)}
              required
            />
            <input
              type="text"
              name="quantity"
              placeholder="Quantité (ex : 50ml, 1 cuillère)"
              value={ingredient.quantity}
              onChange={(e) => handleIngredientChange(index, e)}
              required
            />
            <button type="button" onClick={() => removeIngredient(index)}>
              Supprimer
            </button>
          </div>
        ))}
        <button type="button" onClick={addIngredient}>
          Ajouter un ingrédient
        </button>

        <textarea
          name="instructions"
          placeholder="Instructions de préparation"
          value={formData.instructions}
          onChange={handleChange}
          required
        />

        <button type="submit">Sauvegarder la recette</button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <a href="/">Retour à l'accueil</a>
    </div>
  );
}

export default CreateCocktail;
