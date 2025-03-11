const userRouter = require("express").Router();
const {register, verifyUser, resendVerificationLink, getAllUsers, login, makeAdmin, superAdminAuth } = require("../controllers/userController");
const { authenticate } = require("../middleware/authMiddleware");
const { registerValidation } = require("../middleware/validator");

userRouter.post("/register", registerValidation, register);
userRouter.get("/verify-user/:token", verifyUser);
userRouter.get("/resend-verification", resendVerificationLink);
userRouter.get("/users", getAllUsers);
userRouter.post("/login", login);
userRouter.patch('/users/:id', authenticate, superAdminAuth, makeAdmin);

module.exports = userRouter;