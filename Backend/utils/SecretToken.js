require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id,email,username) => {
  return jwt.sign({ id,email,username }, process.env.TOKEN_KEY, {
    expiresIn: "3h",
  });
};
