const categoryRouter = require('express').Router();
const {createCategory} = require('../controllers/categoryController')
const {authenticate, adminAuth} = require('../middleware/authMiddleware');

categoryRouter.post('/category', authenticate, adminAuth, createCategory);

module.exports = categoryRouter