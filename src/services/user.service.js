import User from "../models/user.model.js";
import {comparePassword, hashPassword } from "../utils/hash.js";
import { signToken } from "../utils/jwt.js";

export async function createUser(data) {
    const hashPass=await hashPassword(data.password);
    const user = new User({...data,password:hashPass});
    return await user.save();
}

export async function login({email,password}) {
    const user = await User.findOne({email});
    if(!user)throw Object.assign(new Error("Invalid credentials"), { status: 401 });

    const isMatch=await comparePassword(password,user.password);
    if(!isMatch)throw Object.assign(new Error("Invalid credentials"), { status: 401 });

    const token = signToken({id:user._id});
    return { token, id: user._id };
}

export async function getUserById(id) {
  return User.findById(id).populate({
    path: "cart.product",
    model: "Product"
  });
}


export async function addToCart(userId, productId, quantity = 1) {
  const user = await User.findById(userId);
  if (!user) throw Object.assign(new Error("User not found"), { status: 404 });

  const item = user.cart.find((c) => c.product == productId);
  if (item) {
    item.quantity += quantity;
  } else {
    user.cart.push({ product: productId, quantity });
  }
  return await user.save();
}

export async function removeFromCart(userId, productId, removeAll = true) {
  const user = await User.findById(userId);
  if (!user) throw Object.assign(new Error("User not found"), { status: 404 });

  const idx = user.cart.findIndex((c) => c.product == productId);
  if (idx === -1) throw Object.assign(new Error("Product not in cart"), { status: 404 });

  if (removeAll) {
    user.cart.splice(idx, 1);
  } else {
    if (user.cart[idx].quantity > 1) {
      user.cart[idx].quantity -= 1;
    } else {
      user.cart.splice(idx, 1);
    }
  }
  await user.save();
  return user;
}

export async function clearCart(userId) {
  const user = await User.findById(userId);
  if (!user) throw Object.assign(new Error("User not found"), { status: 404 });
  user.cart = [];
  await user.save();
  return user;
}