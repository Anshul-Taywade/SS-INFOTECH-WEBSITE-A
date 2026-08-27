const express = require('express');
const { body } = require('express-validator');
const {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require('../controllers/testimonial.controller');
const { protect } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');

const router = express.Router();

router.get('/', getTestimonials);

router.post(
  '/',
  protect,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('title').notEmpty().withMessage('Title is required'),
    body('company').notEmpty().withMessage('Company is required'),
    body('quote').notEmpty().withMessage('Quote is required'),
    validate,
  ],
  createTestimonial
);

router.put('/:id', protect, updateTestimonial);
router.delete('/:id', protect, deleteTestimonial);

module.exports = router;
