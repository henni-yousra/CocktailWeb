import React from 'react';
import '../styles/components/CocktailModal.css';

function CocktailModal({ selectedCocktail, onClose }) {
  // Si pas de cocktail, ne rien afficher
  if (!selectedCocktail) return null;

  const handleOverlayClick = () => {
    onClose();
  };

  const handleContentClick = (e) => {
    e.stopPropagation(); // Empêche la fermeture en cliquant dans la modal
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={handleContentClick}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <img src={selectedCocktail.image} alt={selectedCocktail.name} />
        <h2>{selectedCocktail.name}</h2>
        <p>
          <strong>Catégorie : </strong>
          {selectedCocktail.category}
        </p>
        <p>
          <strong>ingredients : </strong>
          {selectedCocktail.ingredients.map((ingredient) => 
            <span key={ingredient.name}>{ingredient.name} {ingredient.quantity}, </span>
          )}
        </p>
        <p>
          <strong>Instructions : </strong>
          {selectedCocktail.instructions}
        </p>
      </div>
    </div>
  );
}

export default CocktailModal;
