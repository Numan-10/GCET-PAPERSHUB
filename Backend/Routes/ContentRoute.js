const router = require("express").Router();

const {
  Content,
  Units,
  newSubject,
} = require("../controllers/ContentController");
router.get("/", Content);
router.get("/:subject", Units);
router.post("/new", newSubject);

module.exports = router;
