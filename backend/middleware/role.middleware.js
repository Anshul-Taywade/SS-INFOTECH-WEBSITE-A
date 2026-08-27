const ApiResponse = require('../utils/apiResponse');

/**
 * Role authorization middleware
 * @param  {...string} roles Allowed roles
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return ApiResponse.error(
        res,
        `User role '${req.user ? req.user.role : 'Guest'}' is not authorized to access this resource`,
        403
      );
    }
    next();
  };
};

module.exports = { authorize };
