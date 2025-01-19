import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cocktailRoutes from "./routes/cocktailRoutes.js";
import swaggerUi from "swagger-ui-express"; // Import Swagger UI
import swaggerSpec from "../swagger-config.js"; // Import the Swagger specification


// Charger les variables d'environnement
dotenv.config();

// Connexion à MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Routes
app.use("/auth", authRoutes);
app.use("/cocktails", cocktailRoutes);
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
  });
  

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
