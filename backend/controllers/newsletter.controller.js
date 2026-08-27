const Newsletter = require('../models/Newsletter.model');
const ApiResponse = require('../utils/apiResponse');

/**
 * @desc    Subscribe to Newsletter
 * @route   POST /api/v1/newsletter/subscribe
 * @access  Public
 */
exports.subscribe = async (req, res, next) => {
  try {
    const { email } = req.body;

    const existing = await Newsletter.findOne({ email });
    if (existing) {
      if (!existing.isSubscribed) {
        existing.isSubscribed = true;
        await existing.save();
        return ApiResponse.success(res, existing, 'Re-subscribed to newsletter successfully');
      }
      return ApiResponse.success(res, existing, 'You are already subscribed');
    }

    const subscriber = await Newsletter.create({ email });
    return ApiResponse.created(res, subscriber, 'Subscribed to newsletter successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get All Newsletter Subscribers
 * @route   GET /api/v1/newsletter
 * @access  Protected (Admin)
 */
exports.getSubscribers = async (req, res, next) => {
  try {
    const subscribers = await Newsletter.find().sort({ createdAt: -1 });
    return ApiResponse.success(res, subscribers, 'Newsletter subscribers retrieved');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete/Unsubscribe Email
 * @route   DELETE /api/v1/newsletter/:id
 * @access  Protected (Admin)
 */
exports.unsubscribe = async (req, res, next) => {
  try {
    const subscriber = await Newsletter.findByIdAndDelete(req.params.id);
    if (!subscriber) {
      return ApiResponse.error(res, 'Subscriber not found', 404);
    }
    return ApiResponse.success(res, null, 'Unsubscribed successfully');
  } catch (error) {
    next(error);
  }
};
