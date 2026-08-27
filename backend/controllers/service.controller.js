const Service = require('../models/Service.model');
const ApiResponse = require('../utils/apiResponse');

/**
 * @desc    Get All Active Services
 * @route   GET /api/v1/services
 * @access  Public
 */
exports.getServices = async (req, res, next) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    return ApiResponse.success(res, services, 'Services retrieved successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create New Service
 * @route   POST /api/v1/services
 * @access  Protected (Admin)
 */
exports.createService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    return ApiResponse.created(res, service, 'Service created successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update Service
 * @route   PUT /api/v1/services/:id
 * @access  Protected (Admin)
 */
exports.updateService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!service) {
      return ApiResponse.error(res, 'Service not found', 404);
    }
    return ApiResponse.success(res, service, 'Service updated successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete Service
 * @route   DELETE /api/v1/services/:id
 * @access  Protected (Admin)
 */
exports.deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return ApiResponse.error(res, 'Service not found', 404);
    }
    return ApiResponse.success(res, null, 'Service deleted successfully');
  } catch (error) {
    next(error);
  }
};
