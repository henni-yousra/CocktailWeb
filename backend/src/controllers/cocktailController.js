import redis from "../config/redis.js"; // Instance Redis
import Cocktail from "../models/Cocktail.js"; // Modèle Cocktail
import fetch from "node-fetch"; // Pour interroger l'API externe
import User from "../models/User.js"; // Modèle User

const CACHE_KEY = "cocktails";

export const getCocktails = async (req, res) => {
  try {
    const apiCocktailCount = 20;
    const CACHE_KEY = "cocktails";

    // Vérification du cache Redis
    const cachedCocktails = await redis.get(CACHE_KEY);
    if (cachedCocktails) {
      console.log("Serving cocktails from cache");
      return res.status(200).json(JSON.parse(cachedCocktails));
    }

    // Récupération des cocktails depuis la base de données
    const dbCocktails = await Cocktail.find().limit(apiCocktailCount);

    // Récupération des cocktails depuis l'API
    const apiCocktails = await Promise.all(
      Array.from({ length: apiCocktailCount }).map(() =>
        fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
          .then((res) => res.json())
          .then((data) => data.drinks[0])
          .catch(() => null) // Ignorer les erreurs API
      )
    );

    const validApiCocktails = apiCocktails.filter(Boolean);
    const combinedCocktails = [...dbCocktails, ...validApiCocktails].map((cocktail) => ({
      name: cocktail.name || cocktail.strDrink,
      image: cocktail.image || cocktail.strDrinkThumb,
      instructions: cocktail.instructions || cocktail.strInstructions,
      ingredients: (cocktail.ingredients || Object.keys(cocktail)
        .filter((key) => key.startsWith("strIngredient"))
        .map((key) => cocktail[key])
        .filter(Boolean))
        .slice(0, 5),
    }));

    // Sérialisation des données
    const dataToCache = JSON.stringify(combinedCocktails);
    console.log("Data to cache:", dataToCache);

    // Stockage avec expiration séparée
    await redis.set(CACHE_KEY, dataToCache);
    await redis.expire(CACHE_KEY, 3600);

    res.status(200).json(combinedCocktails);
  } catch (error) {
    console.error("Error fetching cocktails:", error);
    res.status(500).json({ message: "Server error" });
  }
};





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
// export const getCocktails = async (req, res) => {

//   try {
//     // Vérifier si les cocktails sont en cache
//     const cachedCocktails = await redis.get(CACHE_KEY);

//     if (cachedCocktails) {
//       console.log("Serving from cache");
//       return res.status(200).json(JSON.parse(cachedCocktails));
//     }

//     // Si non en cache, interroger la base de données
//     const cocktails = await Cocktail.find();
//     console.log("Serving from database");

//     // Mettre en cache les résultats
//     await redis.set(CACHE_KEY, JSON.stringify(cocktails), { EX: 3600 }); // Expire après 1 heure

//     res.status(200).json(cocktails);
//   } catch (error) {
//     console.error("Error fetching cocktails:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

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
