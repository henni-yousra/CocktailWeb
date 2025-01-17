import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import CocktailCard from "../components/CocktailCard";
import CocktailModal from "../components/CocktailModal";
import "../styles/pages/Home.css";

const Home = () => {
  const [cocktails, setCocktails] = useState([]);
  const [selectedCocktail, setSelectedCocktail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false); // Nouvel état pour suivre la recherche

  // Fetch random cocktails on page load
  useEffect(() => {
    if (!isSearching) {
      fetchCocktailsOfTheMoment();
    }
  }, [isSearching]);

  const fetchCocktailsOfTheMoment = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/cocktails/`);
      const data = await response.json();
      setCocktails(data);
    } catch (error) {
      console.error("Error fetching cocktails of the moment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setIsSearching(true);
      const response = await fetch(
        `/api/cocktails/searchCocktails?query=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setCocktails(data);
    } catch (error) {
      console.error("Error searching for cocktails:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setIsSearching(false);
  };

  return (
    <div className="home container">
      <SearchBar onSearch={handleSearch} onReset={handleReset} />
      <h2>{isSearching ? "Search Results" : "Cocktails of the Moment"}</h2>
      {loading ? (
        <p>Loading cocktails...</p>
      ) : (
        <div className="cocktail-grid">
          {cocktails.map((cocktail) => (
            <CocktailCard
              key={cocktail.id}
              cocktail={cocktail}
              onClick={setSelectedCocktail}
            />
          ))}
        </div>
      )}
      <CocktailModal
        cocktail={selectedCocktail}
        onClose={() => setSelectedCocktail(null)}
      />
    </div>
  );
};

export default Home;
