const router = require("express").Router();
const { ReviewController } = require("../controllers/ReviewController");
router.post("/", ReviewController);

module.exports = router;
