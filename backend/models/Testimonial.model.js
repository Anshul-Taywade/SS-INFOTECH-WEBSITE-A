const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Client title is required'],
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
    },
    quote: {
      type: String,
      required: [true, 'Quote message is required'],
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    isApproved: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
