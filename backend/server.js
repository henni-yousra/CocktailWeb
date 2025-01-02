import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Import CORS
import auth from './src/routes/auth.js';

// Initialize dotenv configuration
dotenv.config();

// Create the Express app instance
const app = express();

// Middleware
app.use(cors({
  origin: '*',  // Allow only the frontend to access the backend
}));
app.use(express.json());



// Routes
app.use('/api/', auth);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://backend:${PORT}`));
