import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Function to decode JWT token
const decodeToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode the JWT payload
    return payload;
  } catch (error) {
    console.error("Invalid token format:", error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user information from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      const tokenData = decodeToken(storedToken);
      if (tokenData) {
        const expirationTime = tokenData.exp * 1000 - Date.now();
        if (expirationTime > 0) {
          setUser({ email: tokenData.email, id: tokenData.id });

        } else {
          localStorage.removeItem("authToken");
        }
      } else {
        localStorage.removeItem("authToken");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(`/api/auth/login`, {
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

      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, message: "An error occurred during login" };
    }
  };

  const signup = async (email, password) => {
    try {
      const response = await fetch(`/api/auth/register`, {
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

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
