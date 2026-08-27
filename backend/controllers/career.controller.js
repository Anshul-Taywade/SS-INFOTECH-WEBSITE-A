const Career = require('../models/Career.model');
const ApiResponse = require('../utils/apiResponse');

/**
 * @desc    Get Open Career Positions
 * @route   GET /api/v1/careers
 * @access  Public
 */
exports.getCareers = async (req, res, next) => {
  try {
    const careers = await Career.find({ isOpen: true }).sort({ createdAt: -1 });
    return ApiResponse.success(res, careers, 'Job positions retrieved successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create Job Posting
 * @route   POST /api/v1/careers
 * @access  Protected (Admin)
 */
exports.createCareer = async (req, res, next) => {
  try {
    const career = await Career.create(req.body);
    return ApiResponse.created(res, career, 'Job position created successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update Job Posting
 * @route   PUT /api/v1/careers/:id
 * @access  Protected (Admin)
 */
exports.updateCareer = async (req, res, next) => {
  try {
    const career = await Career.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!career) {
      return ApiResponse.error(res, 'Job position not found', 404);
    }
    return ApiResponse.success(res, career, 'Job position updated successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete Job Posting
 * @route   DELETE /api/v1/careers/:id
 * @access  Protected (Admin)
 */
exports.deleteCareer = async (req, res, next) => {
  try {
    const career = await Career.findByIdAndDelete(req.params.id);
    if (!career) {
      return ApiResponse.error(res, 'Job position not found', 404);
    }
    return ApiResponse.success(res, null, 'Job position deleted successfully');
  } catch (error) {
    next(error);
  }
};
