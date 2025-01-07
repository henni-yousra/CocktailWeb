import React from 'react';
import '../styles/components/CocktailList.css';

function CocktailList({ cocktails, onCardClick, onToggleFavorite, isFavoriteCocktail }) {
  return (
    <section className="results-section">
      <div className="results">
        {cocktails && cocktails.length > 0 ? (
          cocktails.map((cocktail) => {
            const isFav = isFavoriteCocktail(cocktail.id);

            return (
              <div key={cocktail.id} className="cocktail-card">
                <div onClick={() => onCardClick(cocktail)}>
                  <img src={cocktail.image} alt={cocktail.name} />
                  <h2>{cocktail.name}</h2>
                  <p>{cocktail.category}</p>
                </div>

                <button
                  className="favorite-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(cocktail);
                  }}
                >
                  {isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                </button>
              </div>
            );
          })
        ) : (
          <p>Aucun cocktail à afficher.</p>
        )}
      </div>
    </section>
  );
}

export default CocktailList;
