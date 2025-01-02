import express from 'express';
import { signup, login } from '../controllers/authController.js';

const router = express.Router();

// POST request for user signup
router.post('/auth/signup', signup);

// POST request for user login
router.post('/auth/login', login);

export default router;
