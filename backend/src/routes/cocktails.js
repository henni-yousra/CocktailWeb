import express from 'express';
import { fetchCocktails } from '../utils/app-client.js';

const router = express.Router();

// Route pour rechercher des cocktails
router.get('/', async (req, res) => {
    try {
        const { name, ingredients } = req.query;

        // Valider les paramètres
        if (!name && !ingredients) {
            return res.status(400).json({ error: 'Veuillez fournir un nom ou des ingrédients.' });
        }

        // Appeler la fonction utilitaire
        const cocktails = await fetchCocktails({ name, ingredients });
        res.status(200).json(cocktails);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération des cocktails.' });
    }
});

const cocktailsRouter = router;
export default cocktailsRouter;
