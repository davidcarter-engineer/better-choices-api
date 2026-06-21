/**
 * Favorite Model
 *
 * User Ownership:
 * Each favorite belongs to a specific user via the userId field.
 * This creates a relationship between the User and Favorite collections.
 * The 'ref' property tells Mongoose which model to use when populating
 * the field, and ensures only valid User ObjectIds can be stored.
 *
 * By storing userId on every favorite, we can efficiently query
 * "all favorites for user X" without scanning unrelated documents.
 */

const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  restaurant: { type: String },
  calories: { type: Number },
  protein: { type: Number },
  carbs: { type: Number },
  fat: { type: Number },
  healthyScore: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Favorite', favoriteSchema);
