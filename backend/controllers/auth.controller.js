const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const env = require('../config/env');
const ApiResponse = require('../utils/apiResponse');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};

/**
 * @desc    Register Admin User
 * @route   POST /api/v1/auth/register
 * @access  Public (Initial setup) / Protected (Super Admin)
 */
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return ApiResponse.error(res, 'User with this email already exists', 400);
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'ADMIN',
    });

    const token = generateToken(user._id);

    return ApiResponse.created(
      res,
      {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
      'User registered successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Login Admin User
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return ApiResponse.error(res, 'Please provide email and password', 400);
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return ApiResponse.error(res, 'Invalid credentials', 401);
    }

    const token = generateToken(user._id);

    return ApiResponse.success(
      res,
      {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
      'Login successful'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get Current User Profile
 * @route   GET /api/v1/auth/me
 * @access  Protected
 */
exports.getMe = async (req, res, next) => {
  try {
    return ApiResponse.success(res, req.user, 'Profile retrieved');
  } catch (error) {
    next(error);
  }
};
