import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { signup, login } from '../controllers/authController.js';



dotenv.config();

const app = express();

const router = express.Router();

// Middleware
app.use(express.json());
app.use(cors());


router.post('/signup', signup);
router.post('/login', login);


export default router;