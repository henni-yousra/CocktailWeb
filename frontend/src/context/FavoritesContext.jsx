import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth(); // Récupère l'utilisateur connecté depuis AuthContext
  const [favorites, setFavorites] = useState([]);

  // Récupérer les favoris de l'utilisateur depuis le backend
  const fetchFavorites = async () => {
    if (!user) return;

    try {
      const response = await fetch(`/api/cocktails/favorites`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFavorites(data); // Mettre à jour le cache local
      } else {
        console.error("Failed to fetch favorites:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  // Ajouter un cocktail aux favoris
  const addToFavorites = async (cocktail) => {
    if (!user) return;

    try {
      const response = await fetch(`/api/cocktails/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ cocktailId: cocktail.id }),
      });

      if (response.ok) {
        setFavorites((prevFavorites) => [...prevFavorites, cocktail]); // Mettre à jour localement
      } else {
        console.error("Failed to add favorite:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  // Supprimer un cocktail des favoris
  const removeFromFavorites = async (id) => {
    if (!user) return;

    try {
      const response = await fetch(`/api/cocktails/favorites/${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.ok) {
        setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== id)); // Mettre à jour localement
      } else {
        console.error("Failed to remove favorite:", response.statusText);
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  // Charger les favoris de l'utilisateur lors de la connexion
  useEffect(() => {
    if (user) {
      fetchFavorites();
    } else {
      setFavorites([]); // Réinitialiser les favoris si l'utilisateur se déconnecte
    }
  }, [user]);

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

