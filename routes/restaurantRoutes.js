/**
 * Routes
 *
 * Routes define the URL endpoints that clients can request.
 * Each route maps a URL path + HTTP method to a controller function.
 *
 * Express Router lets us group related routes together in separate
 * files, keeping our code modular and organized as the API grows.
 */

const express = require('express');
const router = express.Router();
const { getRestaurants } = require('../controllers/restaurantController');

// GET /api/restaurants
router.get('/', getRestaurants);

module.exports = router;
