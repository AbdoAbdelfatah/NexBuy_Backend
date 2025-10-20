import express from "express";
import * as commentController from "../controllers/comment.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, commentController.addComment);
router.get("/:productId", commentController.getComments);

export default router;