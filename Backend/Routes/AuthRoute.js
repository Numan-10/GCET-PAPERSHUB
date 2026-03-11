const express = require("express");
const router = express.Router();
const { Session, Logout } = require("../controllers/AuthController");
const userVerification = require("../Middlewares/AuthMiddleware");

router.get("/session", userVerification, Session);
router.post("/logout", Logout);

module.exports = router;
