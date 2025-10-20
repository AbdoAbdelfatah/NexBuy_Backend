import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";

export async function createOrderFromCart(userId, shippingAddress) {
  // Get user with populated cart
  const user = await User.findById(userId).populate('cart.product');
  
  if (!user) throw new Error("User not found");
  if (!user.cart || user.cart.length === 0) {
    throw new Error("Cart is empty");
  }

  // Build order items and calculate total
  const items = [];
  let totalPrice = 0;

  for (const cartItem of user.cart) {
    const product = cartItem.product;
    if (!product) continue; // Skip if product was deleted
    
    const priceAtPurchase = product.price;
    const quantity = cartItem.quantity;
    
    items.push({
      product: product._id,
      quantity,
      priceAtPurchase
    });
    
    totalPrice += priceAtPurchase * quantity;
  }

  // Create order
  const order = await Order.create({
    user: userId,
    items,
    totalPrice,
    shippingAddress,
    status: "pending"
  });

  // Clear user's cart after order
  user.cart = [];
  await user.save();

  return order.populate('items.product');
}

export async function getUserOrders(userId) {
  return Order.find({ user: userId })
    .populate('items.product')
    .sort({ createdAt: -1 });
}

export async function getOrderById(orderId) {
  return Order.findById(orderId).populate('items.product');
}
