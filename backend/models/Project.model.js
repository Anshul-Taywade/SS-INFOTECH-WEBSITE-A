const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Web App', 'Cloud & SaaS', 'AI & ML', 'Mobile App'],
    },
    tags: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
      required: [true, 'Project description is required'],
    },
    metrics: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'from-purple-100/50 to-indigo-50/40',
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Project', projectSchema);
