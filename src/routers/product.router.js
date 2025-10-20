import express from "express";
import * as productController from "../controllers/product.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";
import {validationMiddleware} from '../middlewares/validation.middleware.js';
import {createProductSchema, updateProductSchema} from '../validations/product.validation.js';

const router = express.Router();

router.get("/", productController.listProducts);
router.post("/", authMiddleware, validationMiddleware(createProductSchema), productController.createProduct);
router.get("/:id", productController.getProduct);
router.put("/:id", authMiddleware, validationMiddleware(updateProductSchema), productController.updateProduct);
router.delete("/:id", authMiddleware, productController.deleteProduct);

export default router;