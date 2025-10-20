import express from "express";
import * as orderController from "../controllers/order.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";
import {validationMiddleware} from '../middlewares/validation.middleware.js';
import {checkoutSchema} from '../validations/order.validation.js';

const router = express.Router();

router.post("/checkout", authMiddleware, validationMiddleware(checkoutSchema), orderController.checkout);
router.get("/", authMiddleware, orderController.getUserOrders);
router.get("/:id", authMiddleware, orderController.getOrderById);

export default router;
