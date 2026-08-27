const express = require('express');
const { body } = require('express-validator');
const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/project.controller');
const { protect } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');

const router = express.Router();

router.get('/', getProjects);

router.post(
  '/',
  protect,
  [
    body('title').notEmpty().withMessage('Project title is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('description').notEmpty().withMessage('Description is required'),
    validate,
  ],
  createProject
);

router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;
