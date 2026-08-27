const express = require('express');
const { body } = require('express-validator');
const {
  getCareers,
  createCareer,
  updateCareer,
  deleteCareer,
} = require('../controllers/career.controller');
const { protect } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');

const router = express.Router();

router.get('/', getCareers);

router.post(
  '/',
  protect,
  [
    body('title').notEmpty().withMessage('Job title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    validate,
  ],
  createCareer
);

router.put('/:id', protect, updateCareer);
router.delete('/:id', protect, deleteCareer);

module.exports = router;
