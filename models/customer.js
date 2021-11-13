const mongoose = require("mongoose");
const Joi = require("joi");
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true,
  },
  isGold: { type: Boolean, default: false },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true,
  },
});
const Customers = mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
  };
  return Joi.validate(customer, schema);
}

exports.Customers = Customers;
exports.validateCustomer = validateCustomer;
