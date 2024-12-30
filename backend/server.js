
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import auth from './src/routes/auth.js';
import cors from 'cors';

// Initialize dotenv configuration
dotenv.config();

// Create the Express app instance
const app = express();

const allowedOrigins = ['http://localhost:4000','http://localhost:8080' , 'http://172.18.0.5'];   
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));


// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', auth);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));