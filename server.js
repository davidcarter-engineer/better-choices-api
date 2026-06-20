/**
 * Better Choices API - Server Entry Point
 *
 * Express is a minimal and flexible Node.js web framework that
 * provides a set of features for building web and mobile APIs.
 * It simplifies handling HTTP requests, defining routes, and
 * applying middleware.
 *
 * Production Deployment:
 * When deploying to a cloud platform (Render, Railway, AWS, etc.),
 * the platform provides environment variables (PORT, MONGODB_URI,
 * JWT_SECRET) through its dashboard — not through a .env file.
 * The .env file is only used for local development.
 *
 * HTTPS:
 * Cloud platforms handle HTTPS/SSL certificates automatically.
 * Your API code runs plain HTTP, and the platform's load balancer
 * terminates SSL and forwards requests to your app.
 */

/**
 * Environment Variables
 *
 * Environment variables store configuration that changes between
 * environments (development vs production) without modifying code:
 * - PORT: The port the server listens on (cloud platforms assign this)
 * - MONGODB_URI: Database connection string (different per environment)
 * - JWT_SECRET: Secret key for signing tokens (must be unique in production)
 * - NODE_ENV: Determines behavior (error detail, logging level, etc.)
 * - CORS_ORIGIN: Allowed frontend URLs in production
 */
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const corsOptions = require('./config/cors');
const connectDB = require('./config/database');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const restaurantRoutes = require('./routes/restaurantRoutes');
const authRoutes = require('./routes/authRoutes');

// Connect to MongoDB Atlas
connectDB();

// Create the Express application
const app = express();
const PORT = process.env.PORT || 5001;

/**
 * Middleware Stack
 *
 * Middleware runs in the order it is registered. The request flows
 * through each middleware before reaching the route handler:
 *
 * Request → Logger → CORS → JSON Parser → Route Handler → Error Handler → Response
 */
app.use(logger); // Log all requests
app.use(cors(corsOptions)); // Enable CORS for frontend apps
app.use(express.json()); // Parse incoming JSON request bodies

// --- Routes ---

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Better Choices API is running' });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Status route (used by monitoring tools and deployment platforms)
app.get('/api/status', (req, res) => {
  res.json({ status: 'online', version: '1.0.0' });
});

// Auth routes (register, login, profile)
app.use('/api/auth', authRoutes);

// Profile route (shortcut — maps to auth controller)
app.use('/api', authRoutes);

// Restaurant routes
app.use('/api/restaurants', restaurantRoutes);

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Centralized error handler (must be last middleware)
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Better Choices API is running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
