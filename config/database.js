/**
 * Database Configuration
 *
 * Mongoose is an ODM (Object Data Modeling) library for MongoDB.
 * It provides a schema-based solution to model application data
 * and handles connection, validation, and query building.
 *
 * Production Deployment:
 * - Always use a connection string stored in environment variables
 * - Never hardcode database credentials in source code
 * - MongoDB Atlas handles replication, backups, and scaling
 * - Connection events help monitor database health in production
 */

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Monitor connection health after initial connection
    mongoose.connection.on('error', (error) => {
      console.error('MongoDB connection error:', error.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
