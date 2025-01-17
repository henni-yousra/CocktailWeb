import express from "express";
import {
  createCocktail,
  getCocktails,
  getFavorites,
  addFavorite,
  getSearchCocktails,
} from "../controllers/cocktailController.js";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.get("/", getCocktails); // Public : Obtenir tous les cocktails
router.post("/", protect, upload.single("image"), createCocktail); // Authentifié : Créer un cocktail
router.get("/favorites", protect, getFavorites); // Authentifié : Obtenir les favoris
router.post("/favorites", protect, addFavorite); // Authentifié : Ajouter un favori
router.get("/searchCocktails", getSearchCocktails);
export default router;
