const Project = require('../models/Project.model');
const ApiResponse = require('../utils/apiResponse');

/**
 * @desc    Get All Portfolio Projects (with Category Filter)
 * @route   GET /api/v1/projects
 * @access  Public
 */
exports.getProjects = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = category && category !== 'All' ? { category } : {};
    const projects = await Project.find(filter).sort({ createdAt: -1 });
    return ApiResponse.success(res, projects, 'Projects retrieved successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create Portfolio Project
 * @route   POST /api/v1/projects
 * @access  Protected (Admin)
 */
exports.createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    return ApiResponse.created(res, project, 'Project created successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update Portfolio Project
 * @route   PUT /api/v1/projects/:id
 * @access  Protected (Admin)
 */
exports.updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      return ApiResponse.error(res, 'Project not found', 404);
    }
    return ApiResponse.success(res, project, 'Project updated successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete Portfolio Project
 * @route   DELETE /api/v1/projects/:id
 * @access  Protected (Admin)
 */
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return ApiResponse.error(res, 'Project not found', 404);
    }
    return ApiResponse.success(res, null, 'Project deleted successfully');
  } catch (error) {
    next(error);
  }
};
