const router = require("express").Router();
const { upload } = require("../Middlewares/Upload");

const {
  Content,
  Units,
  newSubject,
  newUnit,
} = require("../controllers/ContentController");
router.get("/", Content);
router.get("/:subject", Units);
router.post("/new", newSubject);
router.post("/:sub/new", upload, newUnit);

module.exports = router;
