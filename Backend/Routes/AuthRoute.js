const express = require("express");
const router = express.Router();
const { Signup, Login } = require("../controllers/AuthController");
const {
  loginValidation,
  signupValidation,
} = require("../Middlewares/ValidationMiddleware");

router.post("/login", loginValidation, Login);
router.post("/signup", signupValidation, Signup);

//  ---------------------------> Testing <------------------------------

// router.get("/login", (req, res) => {
//   res.send("login success");
// });
// router.get("/signup", (req, res) => {
//   res.send("Signup success");
// });

module.exports = router;
