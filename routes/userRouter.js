const userRouter = require("express").Router();
const {register, verifyUser, resendVerificationLink, getAllUsers, login, makeAdmin, superAdminAuth } = require("../controllers/userController");
const { authenticate } = require("../middleware/authMiddleware");
const { registerValidation } = require("../middleware/validator");

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account in the system.
 *     tags:
 *       - Users
 *     security: [] # No Authentication Needed
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: Full name of the user
 *                 example: "Akunwanne Kenneth"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user
 *                 example: "obusco4lyfe@gmail.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password (hashed before storing)
 *                 example: "StrongP@ssword123"
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 description: Must match the password field
 *                 example: "StrongP@ssword123"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: User ID
 *                       example: "67c9e9fe16af37fc64fc25f6"
 *                     fullName:
 *                       type: string
 *                       description: Full name of the user
 *                       example: "Akunwanne Kenneth"
 *                     email:
 *                       type: string
 *                       format: email
 *                       description: User's email address
 *                       example: "obusco4lyfe@gmail.com"
 *                     isVerified:
 *                       type: boolean
 *                       description: Whether the user's email is verified
 *                       example: false
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Date and time when the user was created
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
 *                   example: "Email already exists"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to register user"
 */

userRouter.post("/register", registerValidation, register);

/**
 * @swagger
 * /verify-user/{token}:
 *   get:
 *     summary: Verify a user's email
 *     description: Confirms a user's email using a verification token sent to their email.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The verification token sent to the user's email
 *         example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       200:
 *         description: User successfully verified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User verified successfully"
 *       400:
 *         description: Bad Request - Token Issues (Expired or Already Verified)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User already verified, Please proceed to login"
 *       401:
 *         description: Unauthorized - Invalid or Expired Token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Verification link expired: Please resend a new verification link"
 *       404:
 *         description: Not Found - User Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */


userRouter.get("/verify-user/:token", verifyUser);

/**
 * @swagger
 * /resend-verification:
 *   get:
 *     summary: Resend email verification link
 *     description: Sends a new verification email to the user if their account is not yet verified.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: [] # Requires authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's registered email address
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Verification link sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Verification link sent successfully"
 *       400:
 *         description: Bad Request - Missing or Already Verified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User already verified, Please proceed to login"
 *       404:
 *         description: Not Found - User Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

userRouter.get("/resend-verification", resendVerificationLink);
// userRouter.get("/users", authenticate, getAllUsers);


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all Users
 *     description: Returns a list of all users.
 *     tags:
 *       - Users
 *     security: [] # No Authentication Needed
 *     responses:
 *       200:
 *         description: All users in the database
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Users fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: User ID
 *                         example: "67c9e9fe16af37fc64fc25f6"
 *                       fullName:
 *                         type: string
 *                         description: Full name of the user
 *                         example: "Akunwanne Kenneth"
 *                       email:
 *                         type: string
 *                         format: email
 *                         description: User's email address
 *                         example: "obusco4lyfe@gmail.com"
 *                       isVerified:
 *                         type: boolean
 *                         description: Whether the user's email is verified
 *                         example: true
 *                       isAdmin:
 *                         type: boolean
 *                         description: Whether the user has admin privileges
 *                         example: true
 *                       isSuperAdmin:
 *                         type: boolean
 *                         description: Whether the user is a super admin
 *                         example: true
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Date and time when the user was created
 *                         example: "2025-03-06T18:31:26.298Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Date and time when the user was last updated
 *                         example: "2025-03-06T18:32:14.344Z"
 */

userRouter.get("/users", getAllUsers);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and returns a JWT token for authorization.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's registered email address
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The user's password
 *                 example: "SecurePass123!"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: User ID
 *                       example: "605c72b1f1a3c619946b57dc"
 *                     fullName:
 *                       type: string
 *                       description: Full name of the user
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       format: email
 *                       description: User's email address
 *                       example: "user@example.com"
 *                     isVerified:
 *                       type: boolean
 *                       description: Indicates if the user's email is verified
 *                       example: true
 *                     isAdmin:
 *                       type: boolean
 *                       description: Whether the user has admin privileges
 *                       example: false
 *                     isSuperAdmin:
 *                       type: boolean
 *                       description: Whether the user is a super admin
 *                       example: false
 *                 token:
 *                   type: string
 *                   description: JWT access token for authentication
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Bad Request - Missing or Incorrect Credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Please enter your email and password"
 *       401:
 *         description: Unauthorized - Invalid Password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid password"
 *       404:
 *         description: Not Found - User Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

userRouter.post("/login", login);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Promote a user to admin
 *     description: Allows a Super Admin to grant admin privileges to a user. Requires authentication.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: [] # Requires authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to be promoted
 *         example: "605c72b1f1a3c619946b57da"
 *     responses:
 *       200:
 *         description: User successfully promoted to admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User John Doe is now an admin"
 *       400:
 *         description: Bad Request - User is Already an Admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User is already an admin"
 *       401:
 *         description: Unauthorized - Token Required or Expired
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Access denied, token must be provided"
 *       403:
 *         description: Forbidden - Only Super Admins Can Promote Users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized: Not a super admin"
 *       404:
 *         description: Not Found - User Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
userRouter.patch('/users/:id', authenticate, superAdminAuth, makeAdmin);

module.exports = userRouter;