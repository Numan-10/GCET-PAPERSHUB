const router = require("express").Router();
const {
  Subjects,
  UploadPaper,
  ShowPaper,
} = require("../controllers/PaperController");
const { upload } = require("../Middlewares/Upload");
const userVerification = require("../Middlewares/AuthMiddleware");
const { AuthorizeRoles } = require("../Middlewares/AuthorizeRoles");

router.post(
  "/upload",
  userVerification,
  AuthorizeRoles("admin"),
  upload,
  UploadPaper
);
router.get("/subjects", Subjects);
router.get("/subjects/:id", userVerification, AuthorizeRoles("user","admin"),ShowPaper);

module.exports = router;
