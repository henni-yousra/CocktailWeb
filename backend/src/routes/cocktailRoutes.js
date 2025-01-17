// import express from "express";
// import {
//   createCocktail,
//   getCocktails,
//   getFavorites,
//   addFavorite,
//   getSearchCocktails,
//   removeFavorite,
// } from "../controllers/cocktailController.js";
// import { protect } from "../middlewares/authMiddleware.js";
// import upload from "../middlewares/multer.js";

// const router = express.Router();

// router.get("/", getCocktails); // Public : Obtenir tous les cocktails
// router.post("/", protect, upload.single("image"), createCocktail); // Authentifié : Créer un cocktail
// router.get("/favorites", protect, getFavorites); // Authentifié : Obtenir les favoris
// router.post("/favorites", protect, addFavorite); // Authentifié : Ajouter un favori
// router.get("/searchCocktails", getSearchCocktails);
// router.delete("/favorites/:id", protect, removeFavorite); // Authentifié : Supprimer un favori
// export default router;

import express from "express";
import {
  createCocktail,
  getCocktails,
  getFavorites,
  addFavorite,
  getSearchCocktails,
  removeFavorite,
} from "../controllers/cocktailController.js";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cocktails
 *   description: Gestion des cocktails et des favoris
 */

/**
 * @swagger
 * /cocktails:
 *   get:
 *     summary: Obtenir tous les cocktails
 *     description: Retourne une liste de tous les cocktails disponibles.
 *     tags: [Cocktails]
 *     responses:
 *       200:
 *         description: Liste des cocktails récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID du cocktail.
 *                   name:
 *                     type: string
 *                     description: Nom du cocktail.
 *                   image:
 *                     type: string
 *                     description: URL de l'image du cocktail.
 */
router.get("/", getCocktails);

/**
 * @swagger
 * /cocktails:
 *   post:
 *     summary: Créer un nouveau cocktail
 *     description: Permet à un utilisateur authentifié de créer un nouveau cocktail avec une image.
 *     tags: [Cocktails]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nom du cocktail.
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image du cocktail.
 *     responses:
 *       201:
 *         description: Cocktail créé avec succès.
 *       400:
 *         description: Erreur dans les données fournies.
 *       401:
 *         description: Non autorisé.
 */
router.post("/", protect, upload.single("image"), createCocktail);

/**
 * @swagger
 * /cocktails/favorites:
 *   get:
 *     summary: Obtenir les cocktails favoris
 *     description: Retourne les cocktails favoris de l'utilisateur authentifié.
 *     tags: [Cocktails]
 *     responses:
 *       200:
 *         description: Liste des favoris récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID du cocktail.
 *                   name:
 *                     type: string
 *                     description: Nom du cocktail.
 *                   image:
 *                     type: string
 *                     description: URL de l'image du cocktail.
 *       401:
 *         description: Non autorisé.
 */
router.get("/favorites", protect, getFavorites);

/**
 * @swagger
 * /cocktails/favorites:
 *   post:
 *     summary: Ajouter un cocktail aux favoris
 *     description: Ajoute un cocktail spécifique aux favoris de l'utilisateur authentifié.
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
 *                 description: ID du cocktail à ajouter aux favoris.
 *     responses:
 *       201:
 *         description: Cocktail ajouté aux favoris avec succès.
 *       400:
 *         description: Erreur dans les données fournies.
 *       401:
 *         description: Non autorisé.
 */
router.post("/favorites", protect, addFavorite);

/**
 * @swagger
 * /cocktails/searchCocktails:
 *   get:
 *     summary: Rechercher des cocktails
 *     description: Recherche des cocktails par nom ou critère.
 *     tags: [Cocktails]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Terme de recherche.
 *     responses:
 *       200:
 *         description: Liste des cocktails correspondant à la recherche.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID du cocktail.
 *                   name:
 *                     type: string
 *                     description: Nom du cocktail.
 *                   image:
 *                     type: string
 *                     description: URL de l'image du cocktail.
 */
router.get("/searchCocktails", getSearchCocktails);

/**
 * @swagger
 * /cocktails/favorites/{id}:
 *   delete:
 *     summary: Supprimer un cocktail des favoris
 *     description: Supprime un cocktail spécifique des favoris de l'utilisateur authentifié.
 *     tags: [Cocktails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du cocktail à supprimer des favoris.
 *     responses:
 *       200:
 *         description: Cocktail supprimé des favoris avec succès.
 *       404:
 *         description: Cocktail non trouvé.
 *       401:
 *         description: Non autorisé.
 */
router.delete("/favorites/:id", protect, removeFavorite);

export default router;
