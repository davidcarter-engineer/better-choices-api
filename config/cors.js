/**
 * CORS (Cross-Origin Resource Sharing) Configuration
 *
 * CORS is a security feature built into web browsers that blocks
 * requests from one domain to another by default. Since our React
 * web app and React Native mobile app will run on different origins
 * than this API, we need to explicitly allow them to make requests.
 *
 * Without CORS enabled, the browser would block our frontend apps
 * from communicating with this API.
 */

const corsOptions = {
  // Allow requests from our frontend applications
  origin: [
    'http://localhost:5173', // React web app (Vite default)
    'http://localhost:3000', // Alternative local dev
    'http://localhost:19006' // React Native (Expo web)
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

module.exports = corsOptions;
