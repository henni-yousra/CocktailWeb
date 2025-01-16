import express from "express";
import {
  createCocktail,
  getCocktails,
  getFavorites,
  addFavorite,
} from "../controllers/cocktailController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getCocktails); // Public : Obtenir tous les cocktails
router.post("/", protect, createCocktail); // Authentifié : Créer un cocktail
router.get("/favorites", protect, getFavorites); // Authentifié : Obtenir les favoris
router.post("/favorites", protect, addFavorite); // Authentifié : Ajouter un favori

export default router;
