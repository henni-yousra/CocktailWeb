import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        const tokenData = JSON.parse(storedToken); // Parse uniquement si JSON valide
        if (Date.now() > tokenData.exp) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          return null;
        }
        return JSON.parse(storedUser);
      } catch (error) {
        console.error("Invalid token format:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return null;
      }
    }
    return null;
  });

  const login = async (email, password) => {
    try {
      const response = await new Promise((resolve) =>
        setTimeout(() => {
          const expirationTime = Date.now() + 60 * 60 * 1000; // 1 heure
          resolve({
            token: JSON.stringify({ exp: expirationTime, email }), // Token JSON valide
            user: { email },
          });
        }, 1000)
      );

      const { token, user } = response;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, message: "Invalid email or password" };
    }
  };

  const signup = async (email, password) => {
    try {
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve({ success: true }), 1000)
      );
      return response;
    } catch (error) {
      console.error("Signup failed:", error);
      return { success: false, message: "Signup error" };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      try {
        const tokenData = JSON.parse(storedToken);
        const timeUntilExpiration = tokenData.exp - Date.now();

        if (timeUntilExpiration > 0) {
          const timeout = setTimeout(() => {
            logout();
            alert("Your session has expired. Please log in again.");
          }, timeUntilExpiration);

          return () => clearTimeout(timeout); // Nettoyage
        } else {
          logout();
        }
      } catch (error) {
        console.error("Invalid token format on timeout setup:", error);
        logout();
      }
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
