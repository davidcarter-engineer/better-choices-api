/**
 * Database Configuration
 *
 * Mongoose is an ODM (Object Data Modeling) library for MongoDB.
 * It provides a schema-based solution to model application data
 * and handles connection, validation, and query building.
 */

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
