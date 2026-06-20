/**
 * Authentication Middleware
 *
 * JWT (JSON Web Token)
 * A JWT is a compact, URL-safe token that contains encoded user information.
 * After login, the server creates a JWT and sends it to the client.
 * The client includes this token in the Authorization header of future requests.
 * The server verifies the token to confirm the user's identity without
 * needing to check the database on every request.
 *
 * Authentication Middleware
 * This middleware sits between the client request and the route handler.
 * It intercepts requests to protected routes, checks for a valid JWT,
 * and either allows the request to proceed or rejects it with a 401 status.
 */

const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Get token from the Authorization header
  // Format: "Bearer <token>"
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using our secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the user ID to the request object for use in route handlers
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;
