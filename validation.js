const Joi = require("@hapi/joi");

function validateEmployee(employee) {
  const schema = {
    name: Joi.string()
      .min(6)
      .required(),
    phone: Joi.number()
      .integer()
      .min(6)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email()
  };
  return Joi.validate(employee, schema);
}

module.exports.validateEmployee = validateEmployee;
