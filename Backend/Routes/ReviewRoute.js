const router = require("express").Router();
const { ReviewController } = require("../controllers/ReviewController");
router.get("/review", ReviewController);
router.post("/review", ReviewController);

module.exports = router;
