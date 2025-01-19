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

/**
 * @swagger
 * tags:
 *   name: Cocktails
 *   description: Endpoints related to cocktails and user interactions
 */

/**
 * @swagger
 * /cocktails:
 *   get:
 *     summary: Get all cocktails
 *     tags: [Cocktails]
 *     responses:
 *       200:
 *         description: A list of cocktails
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   ingredients:
 *                     type: string
 *                   instructions:
 *                     type: string
 *                   image:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/", getCocktails); // Public : Obtenir tous les cocktails

/**
 * @swagger
 * /cocktails/favorites:
 *   get:
 *     summary: Get all favorite cocktails (authenticated)
 *     tags: [Cocktails]
 *     responses:
 *       200:
 *         description: A list of favorite cocktails
 *       401:
 *         description: Unauthorized, user must be logged in
 */
router.get("/favorites", protect, getFavorites); // Authentifié : Obtenir les favoris

/**
 * @swagger
 * /cocktails/favorites:
 *   post:
 *     summary: Add a cocktail to favorites (authenticated)
 *     tags: [Cocktails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cocktailId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cocktail added to favorites
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post("/favorites", protect, addFavorite); // Authentifié : Ajouter un favori

/**
 * @swagger
 * /cocktails/searchCocktails:
 *   get:
 *     summary: Search cocktails
 *     tags: [Cocktails]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query for cocktails
 *     responses:
 *       200:
 *         description: A list of cocktails that match the search query
 */
router.get("/searchCocktails", getSearchCocktails); // Public : Recherche des cocktails

/**
 * @swagger
 * /cocktails/favorites/{id}:
 *   delete:
 *     summary: Remove a cocktail from favorites (authenticated)
 *     tags: [Cocktails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the cocktail to remove from favorites
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cocktail removed from favorites
 *       401:
 *         description: Unauthorized
 */
router.delete("/favorites/:id", protect, removeFavorite); // Authentifié : Supprimer un favori

/**
 * @swagger
 * /cocktails/community:
 *   get:
 *     summary: Get community recipes
 *     tags: [Cocktails]
 *     responses:
 *       200:
 *         description: A list of community recipes
 */
router.get('/community', getCommunityRecipes); // Public : Fetch all community recipes

/**
 * @swagger
 * /cocktails:
 *   post:
 *     summary: Create a new cocktail (authenticated)
 *     tags: [Cocktails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               ingredients:
 *                 type: string
 *               instructions:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cocktail created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", protect, createCocktail); // Authentifié : Créer un cocktail

/**
 * @swagger
 * /cocktails/{id}:
 *   delete:
 *     summary: Delete a cocktail (authenticated)
 *     tags: [Cocktails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the cocktail to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cocktail deleted successfully
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', protect, deleteCocktail); // Authentifié : Supprimer un cocktail

/**
 * @swagger
 * /cocktails/myCocktails:
 *   get:
 *     summary: Get user's own cocktails
 *     tags: [Cocktails]
 *     responses:
 *       200:
 *         description: A list of user's cocktails
 *       401:
 *         description: Unauthorized
 */
router.get('/myCocktails', protect, getUserCocktails); // Authentifié : Obtenir les cocktails de l'utilisateur

export default router;
