const Contact = require('../models/Contact.model');
const Service = require('../models/Service.model');
const Project = require('../models/Project.model');
const Testimonial = require('../models/Testimonial.model');
const Newsletter = require('../models/Newsletter.model');
const Career = require('../models/Career.model');
const ApiResponse = require('../utils/apiResponse');

/**
 * @desc    Get Admin Dashboard Summary Analytics & Metrics
 * @route   GET /api/v1/dashboard/stats
 * @access  Protected (Admin)
 */
exports.getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalContacts,
      newContacts,
      totalServices,
      totalProjects,
      totalTestimonials,
      totalSubscribers,
      openCareers,
    ] = await Promise.all([
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'NEW' }),
      Service.countDocuments({ isActive: true }),
      Project.countDocuments(),
      Testimonial.countDocuments({ isApproved: true }),
      Newsletter.countDocuments({ isSubscribed: true }),
      Career.countDocuments({ isOpen: true }),
    ]);

    const recentContacts = await Contact.find().sort({ createdAt: -1 }).limit(5);

    return ApiResponse.success(
      res,
      {
        metrics: {
          totalContacts,
          newContacts,
          totalServices,
          totalProjects,
          totalTestimonials,
          totalSubscribers,
          openCareers,
        },
        recentContacts,
      },
      'Dashboard metrics loaded'
    );
  } catch (error) {
    next(error);
  }
};
