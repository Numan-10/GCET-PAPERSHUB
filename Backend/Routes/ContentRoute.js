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
  DeleteContent,
  DeleteUnit,
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

// Delete (whole conetnt + units)
router.delete("/:id", DeleteContent);
// delte single unit
router.delete("/unit/:id", DeleteUnit);
module.exports = router;
