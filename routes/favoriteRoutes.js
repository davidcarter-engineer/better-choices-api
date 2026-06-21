/**
 * Favorites Routes
 *
 * All routes in this file are protected by the auth middleware.
 * The middleware verifies the JWT token before any controller
 * logic runs. If the token is invalid or missing, the request
 * is rejected with a 401 status before reaching the controller.
 */

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { addFavorite, getFavorites, removeFavorite } = require('../controllers/favoriteController');

// All favorites routes require authentication
router.post('/', auth, addFavorite);
router.get('/', auth, getFavorites);
router.delete('/:id', auth, removeFavorite);

module.exports = router;
