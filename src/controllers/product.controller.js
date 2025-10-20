import * as productService from "../services/product.service.js";

export async function createProduct(req, res, next) {
  try {
    const payload = req.body;
    // attach createdBy from authenticated user if present
    if (req.user) payload.createdBy = req.user.id;
    const product = await productService.createProduct(payload);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

export async function listProducts(req, res, next) {
  try {
    const products = await productService.listProducts();
    res.json(products);
  } catch (err) {
    next(err);
  }
}

export async function getProduct(req, res, next) {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    next(err);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    // Only creator can delete (simple ownership check)
    if (!req.user || product.createdBy != req.user.id) {
      return res.status(403).json({ message: "Forbidden: not product owner" });
    }
    await productService.deleteProduct(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    next(err);
  }
}