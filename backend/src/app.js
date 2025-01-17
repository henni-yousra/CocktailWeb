import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { serve, setup } from 'swagger-ui-express';
//import swaggerSpec from "./config/swaggerConfig.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cocktailRoutes from "./routes/cocktailRoutes.js";

// Charger les variables d'environnement
dotenv.config();

// Connexion à MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());


import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Ici vous trouverez la documentation de l\'API',
    },
    servers: [
      {
        url: 'http://localhost:8080/api', 
      },
    ],
  },
  apis: ["./routes/*.js"], 
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
// Routes
app.use("/auth", authRoutes);
app.use("/cocktails", cocktailRoutes);

// Swagger
app.use("/docs", serve,setup(swaggerSpec));



// Middleware pour les routes inconnues
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});



// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API documentation available at http://localhost:8080/api/docs/`);
});
