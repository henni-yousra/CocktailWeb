// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import { FavoritesProvider } from "./context/FavoritesContext";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Favorites from "./pages/Favorites";
// import CreateRecipe from "./pages/CreateRecipe";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";


// const App = () => {
//   return (
//     <AuthProvider>
//       <FavoritesProvider>
//         <Router>
//           <div className="App">
//             <Navbar />
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/favorites" element={<Favorites />} />
//               <Route path="/create-recipe" element={<CreateRecipe />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/signup" element={<Signup />} />
//             </Routes>
//           </div>
//         </Router>
//       </FavoritesProvider>
//     </AuthProvider>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import CreateRecipe from "./pages/CreateRecipe";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./styles/App.css";

const App = () => {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              {/* Routes publiques */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Routes protégées */}
              <Route
                path="/favorites"
                element={
                  <ProtectedRoute>
                    <Favorites />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-recipe"
                element={
                  <ProtectedRoute>
                    <CreateRecipe />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </FavoritesProvider>
    </AuthProvider>
  );
};

export default App;
