/**
 * Auth Routes
 *
 * These routes handle user registration and login.
 * They are public — no token is required to access them.
 */

const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile, changePassword, forgotPassword } = require('../controllers/authController');
const auth = require('../middleware/auth');

// POST /api/auth/register - Create a new account
router.post('/register', register);

// POST /api/auth/login - Log in and receive a token
router.post('/login', login);

// POST /api/auth/forgot-password - Reset password by email (public)
router.post('/forgot-password', forgotPassword);

// PUT /api/auth/change-password - Change password (protected)
router.put('/change-password', auth, changePassword);

// GET /api/profile - Get current user (protected route)
router.get('/profile', auth, getProfile);

// PUT /api/profile - Update current user profile (protected route)
router.put('/profile', auth, updateProfile);

module.exports = router;
