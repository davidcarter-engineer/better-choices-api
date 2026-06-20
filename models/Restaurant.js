/**
 * Restaurant Model
 *
 * Mongoose schemas define the structure of documents in a MongoDB
 * collection. Each field has a type, and can include validation
 * rules like 'required'. The model provides methods to create,
 * read, update, and delete documents.
 */

const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cuisine: { type: String, required: true },
  rating: { type: Number, required: true },
  healthyOptions: { type: Boolean, default: false }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
