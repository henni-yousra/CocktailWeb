import express from "express";
import {
  createCocktail,
  getCocktails,
  getFavorites,
  addFavorite,
  getSearchCocktails,
  removeFavorite,
  deleteCocktail,
  getCommunityRecipes,
  getUserCocktails,
} from "../controllers/cocktailController.js";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.get("/", getCocktails); // Public : Obtenir tous les cocktails
router.get("/favorites", protect, getFavorites); // Authentifié : Obtenir les favoris
router.post("/favorites", protect, addFavorite); // Authentifié : Ajouter un favori
router.get("/searchCocktails", getSearchCocktails);
router.delete("/favorites/:id", protect, removeFavorite); // Authentifié : Supprimer un favori

// Fetch all community recipes
router.get('/community', getCommunityRecipes);

//create recipe
router.post("/", protect, createCocktail); // Authentifié : Créer un cocktail

//delete recipe
router.delete('/:id', protect, deleteCocktail);


router.get('/myCocktails', protect, getUserCocktails);


export default router;
