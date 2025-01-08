import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/pages/CocktailSearch.module.css';

const API_URL = 'http://localhost:5000/api/cocktails';

const CocktailSearch = () => {
    const [name, setName] = useState('');
    const [cocktails, setCocktails] = useState([]);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            const response = await axios.get(API_URL, {
                params: { name },
            });
            setCocktails(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch cocktails. Please try again.');
            setCocktails([]);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Search for Cocktails</h1>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter cocktail name"
                className={styles.input}
            />
            <button onClick={handleSearch} className={styles.button}>Search</button>
            {error && <p className={styles.error}>{error}</p>}
            {cocktails.length === 0 && !error && <p>No cocktails found. Try another search.</p>}
            <ul className={styles.list}>
                {cocktails.map((cocktail, index) => (
                    <li key={index} className={styles.item}>{cocktail.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CocktailSearch;
