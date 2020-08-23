const { check, validationResult } = require("express-validator");

exports.validateCatagoryRequest = [
  check("name", "Name is required!").trim().not().isEmpty(),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
