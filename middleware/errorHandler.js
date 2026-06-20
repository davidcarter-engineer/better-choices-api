/**
 * Error Handler Middleware
 *
 * API Security:
 * In production, you should never expose internal error details
 * (stack traces, database errors) to clients. Attackers can use
 * this information to find vulnerabilities. This middleware sends
 * a generic error message in production while still logging the
 * full error on the server for debugging.
 *
 * Express recognizes error-handling middleware by its 4 parameters:
 * (err, req, res, next). It must be registered AFTER all routes.
 */

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: process.env.NODE_ENV === 'production'
      ? 'Something went wrong'
      : err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
};

module.exports = errorHandler;
