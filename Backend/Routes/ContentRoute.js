const router = require("express").Router();
const { upload } = require("../Middlewares/Upload");
const userVerification = require("../Middlewares/AuthMiddleware");
const { AuthorizeRoles } = require("../Middlewares/AuthorizeRoles");

const {
  Content,
  Units,
  newSubject,
  newUnit,
  fetchSubs,
} = require("../controllers/ContentController");
router.get("/", Content);
router.get("/fetchSubs", fetchSubs);
router.get(
  "/:subject",
  userVerification,
  AuthorizeRoles("user", "admin"),
  Units
);
router.post("/new", userVerification, AuthorizeRoles("admin"), newSubject);
router.post(
  "/:sub/new",
  userVerification,
  AuthorizeRoles("admin"),
  upload,
  newUnit
);
//  update,delete content or individual notes and update individual notes
module.exports = router;
