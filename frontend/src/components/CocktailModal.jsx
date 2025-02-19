import React from "react";
import "../styles/components/CocktailModal.css";


const defaultImage = "/cocktail-default.png"; 
const CocktailModal = ({ cocktail, onClose }) => {
  if (!cocktail) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>{cocktail.name}</h2>
        {cocktail.image ? (
          <img src={cocktail.image} alt={cocktail.name} />
          ) : (
          <img src={defaultImage} alt={cocktail.name} />
        )}
        <p><strong>Category:</strong> {cocktail.category}</p>
        <p><strong>Ingredients:</strong></p>
        <ul>
          {cocktail.ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient}
            </li>
          ))}
        </ul>
        <p>{cocktail.instructions}</p>
        <p><strong>Create By:</strong>  {cocktail.creator ? cocktail.creator.username : "unknown"}</p>
      </div>
    </div>
  );
};

export default CocktailModal;
