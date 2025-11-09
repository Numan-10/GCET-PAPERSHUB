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
  UpdateSubject,
  UpdateUnit,
} = require("../controllers/ContentController");
router.get("/", Content);
router.get("/fetchSubs", fetchSubs);
router.get(
  "/:subject",
  userVerification,
  AuthorizeRoles("user", "manager", "admin"),
  Units
);
router.post(
  "/new",
  userVerification,
  AuthorizeRoles("admin", "manager"),
  newSubject
);
router.post(
  "/:sub/new",
  userVerification,
  AuthorizeRoles("admin", "manager"),
  upload,
  newUnit
);
//  update,delete content or individual notes and update individual notes

// Delete (whole conetnt + units)
router.delete("/:id", userVerification, AuthorizeRoles("admin"), DeleteContent);
//update subject info like subject name, semsester
router.put(
  "/:id",
  userVerification,
  AuthorizeRoles("admin", "manager"),
  UpdateSubject
);
// delte single unit
router.delete(
  "/unit/:id",
  userVerification,
  AuthorizeRoles("admin"),
  DeleteUnit
);
// update unit pdf, name, unit name
router.put("/unit/:unitId", upload, UpdateUnit);
module.exports = router;
