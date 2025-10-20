import * as commentService from "../services/comment.service.js";

export async function addComment(req, res, next) {
  try {
    const { content, rate, productId } = req.body;
    const userId = req.user.id;
    const comment = await commentService.addComment({ content, rate, productId, userId });
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
}

export async function getComments(req, res, next) {
  try {
    const productId = req.params.productId;
    const comments = await commentService.getCommentsForProduct(productId);
    res.json(comments);
  } catch (err) {
    next(err);
  }
}