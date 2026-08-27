const express = require('express');
const { body } = require('express-validator');
const { getPartners, createPartner, deletePartner } = require('../controllers/partner.controller');
const { protect } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');

const router = express.Router();

router.get('/', getPartners);

router.post(
  '/',
  protect,
  [body('name').notEmpty().withMessage('Partner name is required'), validate],
  createPartner
);

router.delete('/:id', protect, deletePartner);

module.exports = router;
