import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// URL de l'API backend depuis l'environnement
const API_URL = import.meta.env.VITE_API_URL;


export const AuthContext = createContext();

// Hook personnalisé pour consommer le contexte
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fonction pour décoder un token JWT
  const decodeToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Décoder le payload JWT
      return payload;
    } catch (error) {
      console.error("Invalid token format:", error);
      return null;
    }
  };

  // Charger les informations utilisateur depuis le stockage local
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      const tokenData = decodeToken(token);

      if (tokenData) {
        const timeUntilExpiration = tokenData.exp * 1000 - Date.now();

        if (timeUntilExpiration > 0) {
          // Le token est valide, on définit l'utilisateur et configure la déconnexion automatique
          setUser({ email: tokenData.email });
          const timeout = setTimeout(() => {
            logout();
            alert("Your session has expired. Please log in again.");
          }, timeUntilExpiration);

          return () => clearTimeout(timeout); // Nettoyage du timeout
        } else {
          // Token expiré
          logout();
        }
      } else {
        // Token invalide
        logout();
      }
    }
    setLoading(false);
  }, []);

  // Connexion de l'utilisateur
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, message: errorData.message || "Login failed" };
      }
  
      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      const tokenData = decodeToken(data.token);
      setUser({ email: tokenData.email });
  
      return { success: true }; // Retourne un succès
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, message: "An error occurred during login" };
    }
  };
  

  // Inscription de l'utilisateur
  const signup = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
      }

      return { success: true };
    } catch (error) {
      console.error("Signup failed:", error);
      return { success: false, message: error.message };
    }
  };

  // Déconnexion de l'utilisateur
  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
