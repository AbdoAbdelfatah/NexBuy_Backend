import express from 'express';
import {createProductController, getProductsController} from '../controllers/product.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();
router.get('/getAll',getProductsController)
router.post("/create", authMiddleware, createProductController);

export default router;