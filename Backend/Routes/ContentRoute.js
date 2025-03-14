const router = require("express").Router();

const { Content, Units } = require("../controllers/ContentController");
router.get("/", Content);
router.get("/:subject", Units);

module.exports = router;
