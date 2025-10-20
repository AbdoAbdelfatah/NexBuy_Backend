import express from "express";
import * as productController from "../controllers/product.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", productController.listProducts);
router.post("/", authMiddleware, productController.createProduct); // only authenticated users can create
router.get("/:id", productController.getProduct);
router.delete("/:id", authMiddleware, productController.deleteProduct);

export default router;