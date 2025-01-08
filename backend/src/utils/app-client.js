import axios from 'axios';

const API_URL = 'https://api.api-ninjas.com/v1/cocktail';
const API_KEY = process.env.API_KEY;

// Function to fetch cocktails from the Ninja API
async function fetchCocktails({ name, ingredients }) {
    try {
        const params = {};
        if (name) params.name = name;
        if (ingredients) params.ingredients = ingredients.join(',');

        const response = await axios.get(API_URL, {
            headers: { 'X-Api-Key': API_KEY },
            params,
        });

        return response.data; // Return cocktails in JSON format
    } catch (error) {
        console.error('Error fetching cocktails from the API:', error.message);
        throw new Error('Unable to fetch cocktails.');
    }
}

export { fetchCocktails };
