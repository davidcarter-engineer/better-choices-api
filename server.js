/**
 * Better Choices API - Server Entry Point
 *
 * Express is a minimal and flexible Node.js web framework that
 * provides a set of features for building web and mobile APIs.
 * It simplifies handling HTTP requests, defining routes, and
 * applying middleware.
 */

// Load environment variables from .env file into process.env
// This must be called before accessing any env variables
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const corsOptions = require('./config/cors');
const connectDB = require('./config/database');
const restaurantRoutes = require('./routes/restaurantRoutes');

// Connect to MongoDB Atlas
connectDB();

// Create the Express application
const app = express();
const PORT = process.env.PORT || 5001;

/**
 * Middleware
 *
 * Middleware functions run between receiving a request and sending
 * a response. They can modify the request/response objects, end the
 * request cycle, or call the next middleware in the stack.
 *
 * Common uses: parsing JSON bodies, enabling CORS, logging, auth.
 */
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

// Restaurant routes
app.use('/api/restaurants', restaurantRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Better Choices API is running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
