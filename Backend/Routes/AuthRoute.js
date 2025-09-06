const express = require("express");
const router = express.Router();
const {
  Signup,
  Login,
  Verify,
  ResendOtp,
  SendCode,
  VerifyResetOtp,
  ChangePass,
} = require("../controllers/AuthController");
const {
  loginValidation,
  signupValidation,
} = require("../Middlewares/ValidationMiddleware");

router.post("/login", loginValidation, Login);
router.post("/signup", signupValidation, Signup);
router.post("/verify", Verify);
router.post("/resend-otp", ResendOtp);
router.post("/SendCode", SendCode);
router.post("/verify-reset-otp", VerifyResetOtp);
router.post("/changePass", ChangePass);

module.exports = router;
