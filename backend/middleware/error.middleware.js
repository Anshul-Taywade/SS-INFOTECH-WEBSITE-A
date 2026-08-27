const ApiResponse = require('../utils/apiResponse');

/**
 * 404 Handler
 */
const notFound = (req, res, next) => {
  return ApiResponse.error(res, `Route Not Found - ${req.originalUrl}`, 404);
};

/**
 * Global Error Handling Middleware
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle Mongoose Bad ObjectId (CastError)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Resource not found with id ${err.value}`;
  }

  // Handle Duplicate Field Error
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    message = `Duplicate field value entered for ${field}`;
  }

  // Handle Mongoose Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map((val) => val.message).join(', ');
  }

  console.error(`[SERVER ERROR] ${message}`, err.stack);

  return ApiResponse.error(res, message, statusCode);
};

module.exports = { notFound, errorHandler };
