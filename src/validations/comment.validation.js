import Joi from "joi";

export const addCommentSchema = {
  body: Joi.object({
    content: Joi.string().min(1).max(500).required(),
    rate: Joi.number().integer().min(1).max(5).required(),
    productId: Joi.string().hex().length(24).required()
  })
};
