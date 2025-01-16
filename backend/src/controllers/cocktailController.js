import Cocktail from "../models/Cocktail.js";
import redis from "../config/redis.js";
import User from "../models/User.js";

// Clé de cache pour les cocktails
const CACHE_KEY = "cocktails";

// Créer un cocktail
export const createCocktail = async (req, res) => {
  try {
    const { name, ingredients, instructions, creator } = req.body;
    const image = req.file;

    // Vérifications des champs obligatoires
    if (!name || !ingredients || !instructions || !creator) {
      return res.status(400).json({
        message: "Name, ingredients, instructions, and creator are required",
      });
    }

    // Création du cocktail
    const newCocktail = new Cocktail({
      name,
      ingredients: ingredients.split(",").map((i) => i.trim()),
      instructions,
      creator,
      image: image ? image.buffer : null, // Contenu binaire de l'image
      imageType: image ? image.mimetype : null, // Type MIME de l'image
    });

    // Sauvegarder dans la base de données
    await newCocktail.save();

    // Invalider le cache Redis si nécessaire
    if (redisClient) {
      await redisClient.del(CACHE_KEY);
    }

    // Réponse avec le cocktail créé
    res.status(201).json(newCocktail);
  } catch (error) {
    console.error("Error creating cocktail:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Obtenir les cocktails (avec cache)
export const getCocktails = async (req, res) => {

  try {
    // Vérifier si les cocktails sont en cache
    const cachedCocktails = await redis.get(CACHE_KEY);

    if (cachedCocktails) {
      console.log("Serving from cache");
      return res.status(200).json(JSON.parse(cachedCocktails));
    }

    // Si non en cache, interroger la base de données
    const cocktails = await Cocktail.find();
    console.log("Serving from database");

    // Mettre en cache les résultats
    await redis.set(CACHE_KEY, JSON.stringify(cocktails), { EX: 3600 }); // Expire après 1 heure

    res.status(200).json(cocktails);
  } catch (error) {
    console.error("Error fetching cocktails:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Ajouter un favori
export const addFavorite = async (req, res) => {
  const { cocktailId } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user.favorites.includes(cocktailId)) {
      user.favorites.push(cocktailId);
      await user.save();
    }

    // Invalider le cache des favoris pour cet utilisateur
    await redis.del(`favorites:${req.user.id}`);

    res.status(200).json({ message: "Cocktail added to favorites" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Obtenir les favoris (avec cache)
export const getFavorites = async (req, res) => {
  try {
    const cacheKey = `favorites:${req.user.id}`;

    // Vérifier si les favoris sont en cache
    const cachedFavorites = await redis.get(cacheKey);

    if (cachedFavorites) {
      console.log("Serving favorites from cache");
      return res.status(200).json(JSON.parse(cachedFavorites));
    }

    // Si non en cache, interroger la base de données
    const user = await User.findById(req.user.id).populate("favorites");
    console.log("Serving favorites from database");

    // Mettre en cache les favoris
    await redis.set(cacheKey, JSON.stringify(user.favorites), "EX", 3600); // Expire après 1 heure

    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
