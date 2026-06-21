/**
 * Favorites Controller
 *
 * Protected Resources:
 * Every route that uses this controller requires a valid JWT token.
 * The auth middleware extracts the user's ID from the token and
 * attaches it to req.user.id. This controller uses that ID to:
 * - Associate new favorites with the authenticated user
 * - Only return favorites belonging to the authenticated user
 * - Only allow deletion of the user's own favorites
 *
 * User-Specific Queries:
 * All database queries filter by userId: req.user.id to ensure
 * users can never access or modify another user's data.
 */

const Favorite = require('../models/Favorite');

// POST /api/favorites - Save an item to the user's favorites
const addFavorite = async (req, res) => {
  try {
    const { name, restaurant, calories, protein, carbs, fat, healthyScore } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'name is required' });
    }

    // Check if already favorited by this user
    const existing = await Favorite.findOne({ userId: req.user.id, name });
    if (existing) {
      return res.status(400).json({ message: 'Already in favorites' });
    }

    const favorite = await Favorite.create({
      userId: req.user.id,
      name,
      restaurant,
      calories,
      protein,
      carbs,
      fat,
      healthyScore
    });

    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET /api/favorites - Retrieve only the authenticated user's favorites
const getFavorites = async (req, res) => {
  try {
    // Filter by userId so users only see their own favorites
    const favorites = await Favorite.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DELETE /api/favorites/:id - Remove a favorite (only if it belongs to the user)
const removeFavorite = async (req, res) => {
  try {
    // Find by both _id and userId to prevent users from deleting others' favorites
    const favorite = await Favorite.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    res.json({ message: 'Favorite removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { addFavorite, getFavorites, removeFavorite };
