const Testimonial = require('../models/Testimonial.model');
const ApiResponse = require('../utils/apiResponse');

/**
 * @desc    Get Approved Testimonials
 * @route   GET /api/v1/testimonials
 * @access  Public
 */
exports.getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({ isApproved: true }).sort({ createdAt: -1 });
    return ApiResponse.success(res, testimonials, 'Testimonials retrieved successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create Testimonial
 * @route   POST /api/v1/testimonials
 * @access  Protected (Admin)
 */
exports.createTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    return ApiResponse.created(res, testimonial, 'Testimonial added successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update Testimonial
 * @route   PUT /api/v1/testimonials/:id
 * @access  Protected (Admin)
 */
exports.updateTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!testimonial) {
      return ApiResponse.error(res, 'Testimonial not found', 404);
    }
    return ApiResponse.success(res, testimonial, 'Testimonial updated successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete Testimonial
 * @route   DELETE /api/v1/testimonials/:id
 * @access  Protected (Admin)
 */
exports.deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return ApiResponse.error(res, 'Testimonial not found', 404);
    }
    return ApiResponse.success(res, null, 'Testimonial deleted successfully');
  } catch (error) {
    next(error);
  }
};
