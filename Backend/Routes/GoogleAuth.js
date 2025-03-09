const express = require("express");
const router = express.Router();
const {GoogleAuth} = require("../controllers/GoogleAuth");

router.get("/google", GoogleAuth);

module.exports = router;
