import express from "express";
import * as commentController from "../controllers/comment.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";
import {validationMiddleware} from '../middlewares/validation.middleware.js';
import {addCommentSchema} from '../validations/comment.validation.js';

const router = express.Router();

router.post("/", authMiddleware, validationMiddleware(addCommentSchema), commentController.addComment);
router.get("/:productId", commentController.getComments);

export default router;