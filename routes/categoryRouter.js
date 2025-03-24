const categoryRouter = require('express').Router();
const {createCategory, getAllCategory} = require('../controllers/categoryController')
const {authenticate, superAdminAuth} = require('../middleware/authMiddleware');

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new category
 *     description: Allows an admin to create a new category. Authentication required.
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: [] # Requires authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category
 *                 example: "Luxury Suites"
 *               rooms:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of room IDs associated with this category
 *                 example: ["605c72b1f1a3c619946b57da", "605c72b1f1a3c619946b57db"]
 *               amenities:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of amenities available in this category
 *                 example: ["Swimming Pool", "Free Breakfast", "Wi-Fi"]
 *               createdBy:
 *                 type: object
 *                 description: Admin who created the category
 *                 properties:
 *                   adminId:
 *                     type: string
 *                     description: The ID of the admin who created the category
 *                     example: "605c72b1f1a3c619946b57dc"
 *                   adminName:
 *                     type: string
 *                     description: Name of the admin who created the category
 *                     example: "John Doe"
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Category ID
 *                       example: "67c9e9fe16af37fc64fc25f6"
 *                     name:
 *                       type: string
 *                       description: The name of the category
 *                       example: "Luxury Suites"
 *                     rooms:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: List of room IDs associated with this category
 *                       example: ["605c72b1f1a3c619946b57da", "605c72b1f1a3c619946b57db"]
 *                     amenities:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: List of amenities available
 *                       example: ["Swimming Pool", "Free Breakfast", "Wi-Fi"]
 *                     createdBy:
 *                       type: object
 *                       properties:
 *                         adminId:
 *                           type: string
 *                           description: The ID of the admin who created the category
 *                           example: "605c72b1f1a3c619946b57dc"
 *                         adminName:
 *                           type: string
 *                           description: Name of the admin who created the category
 *                           example: "John Doe"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Date and time when the category was created
 *                       example: "2025-03-06T18:31:26.298Z"
 *       400:
 *         description: Bad Request - Invalid Input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Category name is required"
 *       401:
 *         description: Unauthorized - User is not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Authentication required"
 *       403:
 *         description: Forbidden - User is not an admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Access denied. Admins only."
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to create category"
 */


categoryRouter.post('/category', authenticate, superAdminAuth, createCategory);
// categoryRouter.post('/category', createCategory);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     description: Returns a list of all categories.
 *     tags:
 *       - Categories
 *     security: [] # No Authentication Needed
 *     responses:
 *       200:
 *         description: All categories in the database
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Categories fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Category ID
 *                         example: "67c9e9fe16af37fc64fc25f6"
 *                       name:
 *                         type: string
 *                         description: Category name
 *                         example: "Electronics"
 *                       description:
 *                         type: string
 *                         description: Short description of the category
 *                         example: "Devices and gadgets"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Date and time when the category was created
 *                         example: "2025-03-06T18:31:26.298Z"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch categories"
 */


categoryRouter.get('/categories', getAllCategory);


module.exports = categoryRouter