const { validationResult } = require('express-validator');
const ApiResponse = require('../utils/apiResponse');

/**
 * Handles validation errors from express-validator rules
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ApiResponse.error(res, 'Validation error', 400, errors.array());
  }
  next();
};

module.exports = validate;
