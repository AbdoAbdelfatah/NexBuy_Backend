import express from "express";
import * as userController from "../controllers/user.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public
router.post("/register", userController.register);
router.post("/login", userController.login);

// Protected
router.get("/me", authMiddleware, userController.me);
router.post("/cart/add", authMiddleware, userController.addProductToCart);
router.post("/cart/remove", authMiddleware, userController.removeProductFromCart);

export default router;