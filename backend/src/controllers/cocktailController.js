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
      id : cocktail.idDrink || cocktail._id,
      category: cocktail.strCategory || cocktail.category,
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


export const addFavorite = async (req, res) => {

  const cocktailId = (req.body.cocktailId); // Récupérer l'identifiant du cocktail depuis les paramètres

  try {
    const user = await User.findById(req.user.id);

    if (!user.favorites.includes(cocktailId)) {
      user.favorites.push(cocktailId);
      await user.save();

      // Invalider le cache des favoris pour cet utilisateur
      await redis.del(`favorites:${req.user.id}`);
    }

    res.status(200).json({ message: "Cocktail added to favorites" });
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const removeFavorite = async (req, res) => {
  const { cocktailId } = parseInt(req.body.cocktailId); // Récupérer l'identifiant du cocktail depuis les paramètres

  try {
    // Récupérer l'utilisateur connecté
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Vérifier si le cocktail est déjà dans les favoris
    const favoriteIndex = user.favorites.indexOf(cocktailId);

    if (favoriteIndex === -1) {
      return res.status(404).json({ message: "Cocktail not found in favorites" });
    }

    // Retirer le cocktail des favoris
    user.favorites.splice(favoriteIndex, 1);
    await user.save();

    // Invalider le cache des favoris pour cet utilisateur
    await redis.del(`favorites:${req.user.id}`);

    res.status(200).json({ message: "Cocktail removed from favorites" });
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).json({ message: "Server error" });
  }
};



export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
      console.log("user not found");
    }

    // Vérifier le cache Redis pour les favoris
    // const cachedFavorites = await redis.get(`favorites:${req.user.id}`);
    // if (cachedFavorites) {
    //   return res.status(200).json(JSON.parse(cachedFavorites));
    // }

    // Récupérer les détails des cocktails
    const favoriteCocktails = await Promise.all(
      user.favorites.map(async (cocktailId) => {
        try {
          // Vérifiez dans votre propre base de données (si vous stockez les cocktails localement)
          const cachedCocktail = await Cocktail.findOne({ id: cocktailId });
          if (cachedCocktail) {
            return cachedCocktail;
          }

          // Si le cocktail n'est pas en base, interrogez TheCocktailDB
          const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`);
          const data = await response.json();
          const drink = data.drinks[0];
      
          const extractedData = {
            id: drink.idDrink,
            name: drink.strDrink,
            image: drink.strDrinkThumb,
            instructions: drink.strInstructions,
            ingredients: Object.entries(drink)
              .filter(([key, value]) => key.startsWith("strIngredient") && value) // Récupère les ingrédients non vides
              .map(([_, value]) => value),
          };
          return extractedData;

        } catch (error) {
          console.error(`Error fetching details for cocktail ID ${cocktailId}:`, error);
          return null;
        }
      })
    );

    // Filtrer les cocktails null (erreurs de récupération)
    const validFavorites = favoriteCocktails.filter((cocktail) => cocktail !== null);

    // Mettre les favoris dans le cache Redis
    await redis.set(`favorites:${req.user.id}`, JSON.stringify(validFavorites), "EX", 3600); // Expiration : 1 heure

    res.status(200).json(validFavorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Obtenir les favoris (avec cache)
// export const getFavorites = async (req, res) => {
//   try {
//     const cacheKey = `favorites:${req.user.id}`;

//     // Vérifier si les favoris sont en cache
//     const cachedFavorites = await redis.get(cacheKey);

//     if (cachedFavorites) {
//       console.log("Serving favorites from cache");
//       return res.status(200).json(JSON.parse(cachedFavorites));
//     }

//     // Si non en cache, interroger la base de données
//     const user = await User.findById(req.user.id).populate("favorites");
//     console.log("Serving favorites from database");

//     // Mettre en cache les favoris
//     await redis.set(cacheKey, JSON.stringify(user.favorites), "EX", 3600); // Expire après 1 heure

//     res.status(200).json(user.favorites);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const getSearchCocktails = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Query parameter is required" });
  }

  try {
    // URL pour rechercher par nom
    const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`;

    // Appel API
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error fetching from TheCocktailDB: ${response.statusText}`);
    }

    const data = await response.json();

    // Transformez les résultats si nécessaires
    const results = data.drinks
      ? data.drinks.map((drink) => ({
          id: drink.idDrink,
          name: drink.strDrink,
          image: drink.strDrinkThumb,
          instructions: drink.strInstructions,
          category: drink.strCategory,
          ingredients: Object.keys(drink)
            .filter((key) => key.startsWith("strIngredient"))
            .map((key) => drink[key])
            .filter(Boolean),
        }))
      : [];

    res.status(200).json(results);
  } catch (error) {
    console.error("Error searching cocktails:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

