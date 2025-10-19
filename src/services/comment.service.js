import Comment from "../models/comment.model.js";

export async function addComment({ content, rate, productId, userId }) {
  return Comment.create({ content, rate, productId, userId });
}

export async function getCommentsForProduct(productId) {
  return Comment.find({ productId }).populate("userId", "name email").sort({ createdAt: -1 });
}