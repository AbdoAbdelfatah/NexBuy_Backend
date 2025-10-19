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
  // options could include pagination in future
  return Product.find(filter).sort({ createdAt: -1 });
}

   /* return await Product.aggregate([{
        $lookup:{
            from:"users",
            localField:"createdBy",
            foreignField:"_id",
            as:"userData"
        }
    },{
    $project: {
      title: 1,
      price: 1,
      "userData.name": 1,
      "userData.email": 1
    }
  }]); */
