const express = require("express");
const router = express.Router();
const userVerification = require("../Middlewares/AuthMiddleware");
// const { isAdmin } = require("../Middlewares/isAdmin");

// router.get("/verify", userVerification, isAdmin);
router.get("/verify", userVerification, (req, res) => {
  res.json({ message: "Auth Success" });
});

module.exports = router;
