const router = require("express").Router();
const { upload } = require("../Middlewares/Upload");
const userVerification = require("../Middlewares/AuthMiddleware");
const { isAdmin } = require("../Middlewares/isAdmin");

const {
  Content,
  Units,
  newSubject,
  newUnit,
} = require("../controllers/ContentController");
router.get("/", Content);
router.get("/:subject", Units);
router.post("/new", userVerification, isAdmin, newSubject);
router.post("/:sub/new", userVerification, isAdmin, upload, newUnit);

module.exports = router;
