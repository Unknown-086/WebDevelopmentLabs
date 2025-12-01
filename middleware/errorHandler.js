// Centralized error handler middleware with advanced error handling
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Mongoose CastError - Invalid ObjectId
  if (err.name === 'CastError') {
    return res.status(400).json({
      message: `Invalid ${err.path}: ${err.value}. Please provide a valid ID.`,
      error: 'CastError'
    });
  }

  // Mongoose ValidationError - Schema validation failed
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(error => error.message);
    return res.status(400).json({
      message: 'Validation failed',
      errors: messages,
      error: 'ValidationError'
    });
  }

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({
      message: `Duplicate value for ${field}. Please use another value.`,
      error: 'DuplicateKeyError'
    });
  }

  // JWT errors (if using authentication)
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      message: 'Invalid token. Please log in again.',
      error: 'JsonWebTokenError'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      message: 'Token has expired. Please log in again.',
      error: 'TokenExpiredError'
    });
  }

  // Default error (500 Internal Server Error)
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error',
    error: err.name || 'Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;
