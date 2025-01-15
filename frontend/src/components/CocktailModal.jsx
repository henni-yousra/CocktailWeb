import React from "react";
import "../styles/components/CocktailModal.css";

const CocktailModal = ({ cocktail, onClose }) => {
  if (!cocktail) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>{cocktail.strDrink}</h2>
        <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
        <p><strong>Category:</strong> {cocktail.strCategory}</p>
        <p><strong>Ingredients:</strong></p>
        <ul>
          {Object.keys(cocktail)
            .filter((key) => key.startsWith("strIngredient") && cocktail[key])
            .map((key) => (
              <li key={key}>{cocktail[key]}</li>
            ))}
        </ul>
        <p>{cocktail.strInstructions}</p>
      </div>
    </div>
  );
};

export default CocktailModal;
