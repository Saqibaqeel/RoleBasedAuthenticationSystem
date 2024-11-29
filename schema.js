
const Joi = require('joi');


const userValidationSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});


const listingValidationSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  price: Joi.number().positive().required(),
  location: Joi.string().min(3).max(100).required(),
  image: Joi.string().uri().optional()
});

module.exports = { userValidationSchema, listingValidationSchema };
