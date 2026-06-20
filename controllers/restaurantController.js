/**
 * Restaurant Controller
 *
 * Controllers handle the logic for each route. They use async/await
 * to work with the database (which returns Promises) and try/catch
 * to handle errors gracefully with proper HTTP status codes.
 */

const Restaurant = require('../models/Restaurant');

// GET /api/restaurants - Retrieve all restaurants from MongoDB
const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// POST /api/restaurants - Create a new restaurant in MongoDB
const createRestaurant = async (req, res) => {
  try {
    const { name, cuisine, rating, healthyOptions } = req.body;

    if (!name || !cuisine || rating === undefined) {
      return res.status(400).json({ message: 'Name, cuisine, and rating are required' });
    }

    const restaurant = await Restaurant.create({ name, cuisine, rating, healthyOptions });
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getRestaurants, createRestaurant };
