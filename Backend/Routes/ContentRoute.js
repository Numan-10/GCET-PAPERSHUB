const router = require("express").Router();
const { upload } = require("../Middlewares/Upload");
const userVerification = require("../Middlewares/AuthMiddleware");

const {
  Content,
  Units,
  newSubject,
  newUnit,
} = require("../controllers/ContentController");
router.get("/", Content);
router.get("/:subject", userVerification, Units);
router.post("/new", newSubject);
router.post("/:sub/new", upload, newUnit);

module.exports = router;
