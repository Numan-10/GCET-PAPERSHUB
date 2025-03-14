const router = require("express").Router();
const { ContentController } = require("../controllers/ContentController");
router.get("/", ContentController);

router.get("/:subject", (req, res) => {
  const subject = req.params;
  console.log(subject);
  res.send(subject)
});

module.exports = router;
