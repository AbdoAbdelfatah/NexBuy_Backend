import * as productService from "../services/product.service.js";

export async function createProduct(req, res, next) {
  try {
    const payload = req.body;
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

export async function updateProduct(req, res, next) {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    
    const productOwnerId = product.createdBy?._id?.toString() || product.createdBy?.toString();
    if (!req.user || productOwnerId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden: not product owner" });
    }
    
    const updatedProduct = await productService.updateProduct(req.params.id, req.body);
    res.json(updatedProduct);
  } catch (err) {
    next(err);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    
    const productOwnerId = product.createdBy?._id?.toString() || product.createdBy?.toString();
    if (!req.user || productOwnerId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden: not product owner" });
    }
    
    await productService.deleteProduct(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    next(err);
  }
}