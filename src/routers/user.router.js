import express from "express";
import * as userController from "../controllers/user.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";
import {validationMiddleware} from '../middlewares/validation.middleware.js';
import {
  registerSchema,
  loginSchema,
  addProductToCartSchema,
  removeProductFromCartSchema,
} from '../validations/user.validation.js';
const router = express.Router();

// Public
router.post("/register",validationMiddleware(registerSchema), userController.register);
router.post("/login",validationMiddleware(loginSchema),userController.login);

// Protected
router.get("/me", authMiddleware, userController.me);
router.post("/cart/add", authMiddleware,validationMiddleware(addProductToCartSchema), userController.addProductToCart);
router.post("/cart/remove", authMiddleware,validationMiddleware(removeProductFromCartSchema),userController.removeProductFromCart);

export default router;