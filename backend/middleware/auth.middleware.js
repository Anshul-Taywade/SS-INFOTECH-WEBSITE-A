const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const env = require('../config/env');
const ApiResponse = require('../utils/apiResponse');

/**
 * Protect routes by verifying JWT Bearer token
 */
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return ApiResponse.error(res, 'Not authorized, token missing', 401);
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return ApiResponse.error(res, 'User not found or token invalid', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    return ApiResponse.error(res, 'Token verification failed', 401);
  }
};

module.exports = { protect };
