import Joi from "joi";

export const checkoutSchema = {
  body: Joi.object({
    shippingAddress: Joi.object({
      fullname: Joi.string().required(),
      line: Joi.string().required(),
      city: Joi.string().required(),
      country: Joi.string().required()
    }).required()
  })
};
