import axios from 'axios';
import assert from 'assert';

describe('Cocktail API', function() {
    it('should return cocktail recipes matching the search parameters', async function() {
        const apiKey = 'MicmuiUdxMPglKdr/eqOqw==cq16zhaQ78JjKIjm';
        const name = 'bloody mary';
        const apiUrl = `https://api.api-ninjas.com/v1/cocktail?name=${encodeURIComponent(name)}`;

        const response = await axios.get(apiUrl, {
            headers: {
                'X-Api-Key': apiKey
            }
        });

        assert.strictEqual(response.status, 200);
        assert(Array.isArray(response.data));
        assert(response.data.length > 0);
        assert(response.data[0].name.toLowerCase().includes(name));
    });

});