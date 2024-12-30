import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import auth from './src/routes/auth.js';
import cors from 'cors';

// Initialize dotenv configuration
dotenv.config();

// Create the Express app instance
const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: '*', // Allow all origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', auth);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://backend:${PORT}`));
