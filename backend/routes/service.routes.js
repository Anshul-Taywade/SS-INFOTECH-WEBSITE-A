const express = require('express');
const { body } = require('express-validator');
const {
  getServices,
  createService,
  updateService,
  deleteService,
} = require('../controllers/service.controller');
const { protect } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');

const router = express.Router();

router.get('/', getServices);

router.post(
  '/',
  protect,
  [
    body('title').notEmpty().withMessage('Service title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    validate,
  ],
  createService
);

router.put('/:id', protect, updateService);
router.delete('/:id', protect, deleteService);

module.exports = router;
