import Joi from "joi";

export const createProductSchema = {
  body: Joi.object({
    title: Joi.string().min(3).max(100).required(),
    desc: Joi.string().max(1000),
    price: Joi.number().min(0.01).required(),
    images: Joi.array().items(
      Joi.object({
        url: Joi.string().uri().required(),
        alt: Joi.string().required()
      })
    ),
    specs: Joi.object().pattern(Joi.string(), Joi.alternatives(Joi.string(), Joi.number()))
  })
};

export const updateProductSchema = {
  body: Joi.object({
    title: Joi.string().min(3).max(100),
    desc: Joi.string().max(1000).allow(''),
    price: Joi.number().min(0.01),
    images: Joi.array().items(
      Joi.object({
        url: Joi.string().uri().required(),
        alt: Joi.string().required()
      })
    ),
    specs: Joi.object().pattern(Joi.string(), Joi.alternatives(Joi.string(), Joi.number()))
  }).min(1) // At least one field must be provided
};
