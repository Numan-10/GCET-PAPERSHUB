const Joi = require("joi");

//-----------------> Login Validation
const signupValidation = (req, res, next) => {
  const Schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 1, tlds: { allow: ["com"] } })
      .required(),
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(4).max(30).required(),
  });
  const { error } = Schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad Request", error });
  }
  next();
};

//----------------> Signnup Validation
const loginValidation = (req, res, next) => {
  const Schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 1, tlds: { allow: ["com"] } })
      .required(),
    password: Joi.string().min(4).max(30).required(),
  });
  const { error } = Schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad Request", error });
  }
  next();
};
// const BugReportsValidation = (req, res, next) => {
//   const schema = Joi.object({
//     title: Joi.string().min(4).max(30).required(),
//     description: Joi.string().min(4).max(300).required(),
//     priority: Joi.string()
//       .valid("low", "medium", "high", "critical")
//       .required(),
//     email: Joi.string().email().optional(),
//   });

//   const { error } = schema.validate(req.body);

//   if (error) {
//     return res.status(400).json({
//       success: false,
//       message: error.details[0].message,
//     });
//   }

//   next();
// };

module.exports = {
  signupValidation,
  loginValidation,
  // BugReportsValidation,
};
