const express = require('express');
const { body } = require('express-validator');
const {
  createContact,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
} = require('../controllers/contact.controller');
const { protect } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');

const router = express.Router();

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('service').notEmpty().withMessage('Service selection is required'),
    body('message').notEmpty().withMessage('Project message is required'),
    validate,
  ],
  createContact
);

router.get('/', protect, getContacts);
router.get('/:id', protect, getContactById);
router.patch('/:id/status', protect, updateContactStatus);
router.delete('/:id', protect, deleteContact);

module.exports = router;
