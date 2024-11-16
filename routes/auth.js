// routes/auth.js
import express from 'express';
import { signup, login } from '../controllers/authController.js'; // Ensure correct import for controller functions

const router = express.Router();

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

export default router;  // Export the router to use in server.js
