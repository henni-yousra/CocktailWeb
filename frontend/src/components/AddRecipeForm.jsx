import React, { useState } from 'react';

function AddRecipeForm({ onAdd }) {
  // État local pour le formulaire
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    image: '',
    instructions: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    // Réinitialiser le formulaire après l'ajout
    setFormData({
      name: '',
      category: '',
      image: '',
      instructions: '',
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        maxWidth: '300px',
        margin: '0 auto',
      }}
    >
      <input
        type="text"
        name="name"
        placeholder="Nom du cocktail"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Catégorie (ex: cocktail, apperitif, ...)"
        value={formData.category}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="image"
        placeholder="URL de l'image"
        value={formData.image}
        onChange={handleChange}
        required
      />
      <textarea
        name="instructions"
        placeholder="Instructions"
        rows={3}
        value={formData.instructions}
        onChange={handleChange}
        required
      />
      <button type="submit">Ajouter la recette</button>
    </form>
  );
}

export default AddRecipeForm;
