import * as orderService from "../services/order.service.js";

export async function checkout(req, res, next) {
  try {
    const userId = req.user.id;
    const { shippingAddress } = req.body;
    
    const order = await orderService.createOrderFromCart(userId, shippingAddress);
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    next(err);
  }
}

export async function getUserOrders(req, res, next) {
  try {
    const userId = req.user.id;
    const orders = await orderService.getUserOrders(userId);
    res.json(orders);
  } catch (err) {
    next(err);
  }
}

export async function getOrderById(req, res, next) {
  try {
    const orderId = req.params.id;
    const userId = req.user.id;
    
    const order = await orderService.getOrderById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });
    
    // Only order owner can view
    if (order.user.toString() !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    
    res.json(order);
  } catch (err) {
    next(err);
  }
}
