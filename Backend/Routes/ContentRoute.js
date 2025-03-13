const router = require("express").Router();
const { ContentController } = require("../controllers/ContentController");
router.get("/", ContentController);

module.exports = router;
