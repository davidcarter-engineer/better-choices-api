/**
 * Auth Routes
 *
 * These routes handle user registration and login.
 * They are public — no token is required to access them.
 */

const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const auth = require('../middleware/auth');

// POST /api/auth/register - Create a new account
router.post('/register', register);

// POST /api/auth/login - Log in and receive a token
router.post('/login', login);

// GET /api/profile - Get current user (protected route)
router.get('/profile', auth, getProfile);

module.exports = router;
