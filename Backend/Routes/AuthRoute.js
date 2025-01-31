const express = require("express");
const router = express.Router();
const { Signup, Login } = require("../controllers/AuthController");
const {
  loginValidation,
  signupValidation,
} = require("../Middlewares/ValidationMiddleware");

router.post("/login", loginValidation, Login);
router.post("/signup", signupValidation, Signup);


module.exports = router;
