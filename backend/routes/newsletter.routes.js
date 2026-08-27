const express = require('express');
const { body } = require('express-validator');
const { subscribe, getSubscribers, unsubscribe } = require('../controllers/newsletter.controller');
const { protect } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');

const router = express.Router();

router.post(
  '/subscribe',
  [body('email').isEmail().withMessage('Valid email address is required'), validate],
  subscribe
);

router.get('/', protect, getSubscribers);
router.delete('/:id', protect, unsubscribe);

module.exports = router;
