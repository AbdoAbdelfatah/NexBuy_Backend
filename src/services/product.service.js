import Product from "../models/product.model.js";

export async function createProduct(payload) {
  return Product.create(payload);
}

export async function updateProduct(productId, updates) {
  return Product.findByIdAndUpdate(productId, updates, { new: true });
}

export async function deleteProduct(productId) {
  return Product.findByIdAndDelete(productId);
}

export async function getProductById(productId) {
  return Product.findById(productId).populate("createdBy", "name email");
}

export async function listProducts(filter = {}, options = {}) {
  return Product.find(filter).sort({ createdAt: -1 });
}
