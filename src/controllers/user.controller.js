import * as userService from "../services/user.service.js";
import { sendMail } from "../utils/mail.js";

export async function register(req, res, next) {
  try {
    const { name, email, password, age, gender } = req.body;
    const user = await userService.createUser({ name, email, password, age, gender });

    // Generate token for auto-login
    const { token } = await userService.login({ email, password });

    // Optionally send welcome email (best practice: don't block registration on email)
    sendMail({
      to: user.email,
      subject: "Welcome to NexBuy!",
      text: `Hi ${user.name}, welcome to NexBuy.`
    }).catch((err) => {
      console.warn("Welcome email failed:", err.message);
    });

    res.status(201).json({ 
      message: "User created", 
      token,
      user: { 
        _id: user._id, 
        email: user.email, 
        name: user.name,
        age: user.age,
        gender: user.gender,
        cart: []
      } 
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const { token, id } = await userService.login({ email, password });
    const user = await userService.getUserById(id);
    res.json({ 
      token, 
      user: { 
        _id: user._id, 
        name: user.name, 
        email: user.email, 
        age: user.age, 
        gender: user.gender,
        cart: user.cart 
      } 
    });
  } catch (err) {
    next(err);
  }
}

export async function me(req, res, next) {
  try {
    const user = await userService.getUserById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function addProductToCart(req, res, next) {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    const user = await userService.addToCart(userId, productId, Number(quantity) || 1);
    res.json({ message: "Added to cart", cart: user.cart });
  } catch (err) {
    next(err);
  }
}

export async function removeProductFromCart(req, res, next) {
  try {
    const userId = req.user.id;
    const { productId, removeAll } = req.body;
    const user = await userService.removeFromCart(userId, productId, removeAll !== false);
    res.json({ message: "Item updated in cart", cart: user.cart });
  } catch (err) {
    next(err);
  }
}