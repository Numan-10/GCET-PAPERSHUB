require("dotenv").config();
const User = require("../Models/User");

require("dotenv").config();
const jwt = require("jsonwebtoken");

const userVerification = (req, res, next) => {
  // console.log("Token received:", req.headers["authorization"]);
  const Auth = req.headers["authorization"];
  if (!Auth) {
    return res.status(403).json({ message: "Please sign in to continue." });
  }
  try {
    const decoded = jwt.verify(Auth, process.env.TOKEN_KEY);
    // console.log(decoded);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Session invalid. Sign in again." });
  }
};

module.exports = userVerification;
