const Partner = require('../models/Partner.model');
const ApiResponse = require('../utils/apiResponse');

/**
 * @desc    Get All Partners / Trusted Companies
 * @route   GET /api/v1/partners
 * @access  Public
 */
exports.getPartners = async (req, res, next) => {
  try {
    const partners = await Partner.find().sort({ order: 1, createdAt: -1 });
    return ApiResponse.success(res, partners, 'Partners retrieved successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add Partner Company
 * @route   POST /api/v1/partners
 * @access  Protected (Admin)
 */
exports.createPartner = async (req, res, next) => {
  try {
    const partner = await Partner.create(req.body);
    return ApiResponse.created(res, partner, 'Partner company added successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete Partner Company
 * @route   DELETE /api/v1/partners/:id
 * @access  Protected (Admin)
 */
exports.deletePartner = async (req, res, next) => {
  try {
    const partner = await Partner.findByIdAndDelete(req.params.id);
    if (!partner) {
      return ApiResponse.error(res, 'Partner not found', 404);
    }
    return ApiResponse.success(res, null, 'Partner removed successfully');
  } catch (error) {
    next(error);
  }
};
