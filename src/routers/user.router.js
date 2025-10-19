import express from "express";
import * as userController from "../controllers/user.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public
router.post("/register", userController.register);
router.post("/login", userController.login);

// Protected
router.get("/me", auth, userController.me);
router.post("/cart/add", auth, userController.addProductToCart);
router.post("/cart/remove", auth, userController.removeProductFromCart);

export default router;