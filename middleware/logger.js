/**
 * Request Logger Middleware
 *
 * Logging is essential in production to monitor API traffic, debug
 * issues, and detect suspicious activity. This middleware runs on
 * every incoming request and logs the HTTP method, URL, status code,
 * and response time.
 *
 * In production, you would typically send these logs to a service
 * like AWS CloudWatch, Datadog, or similar for analysis and alerting.
 */

const logger = (req, res, next) => {
  const start = Date.now();

  // Log after the response is sent
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms)`
    );
  });

  next();
};

module.exports = logger;
