/**
 * CORS (Cross-Origin Resource Sharing) Configuration
 *
 * CORS is a security feature built into web browsers that blocks
 * requests from one domain to another by default. Since our React
 * web app and React Native mobile app will run on different origins
 * than this API, we need to explicitly allow them to make requests.
 *
 * Production Deployment:
 * In production, you must whitelist only your actual deployed frontend
 * URLs. Allowing all origins (*) in production is a security risk —
 * it would let any website make requests to your API.
 *
 * The CORS_ORIGIN environment variable lets you add production URLs
 * without changing code. Set it to a comma-separated list of allowed
 * origins in your cloud hosting platform's environment settings.
 */

// Default allowed origins for local development
const devOrigins = [
  'http://localhost:3001', // React web app (better-choices-react)
  'http://localhost:5173', // React web app (Vite default)
  'http://localhost:3000', // Alternative local dev
  'http://localhost:19006' // React Native (Expo web)
];

// Production origins from environment variable (comma-separated)
const prodOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
  : [];

const corsOptions = {
  origin: [...devOrigins, ...prodOrigins],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

module.exports = corsOptions;
