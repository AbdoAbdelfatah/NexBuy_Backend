import joi from 'joi';

export const registerSchema={
    body:joi.object({
        name:joi.string().min(3).max(100).required(), 
        email:joi.string().email().required(), 
        password:joi.string().min(6).max(100).required(), 
        age:joi.number().min(10).max(100).required(),
        gender:joi.string().valid("male","female").required()
    })
}


export const loginSchema = {
  body: joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(100).required(),
  }),
};

export const addProductToCartSchema = {
  body: joi.object({
    productId: joi.string().hex().length(24).required(), // assuming MongoDB ObjectId
    quantity: joi.number().integer().min(1).default(1),
  }),
};

export const removeProductFromCartSchema = {
  body: joi.object({
    productId: joi.string().hex().length(24).required(),
    removeAll: joi.boolean().default(true),
  }),
};