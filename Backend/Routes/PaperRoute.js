const router = require("express").Router();
const {
  Subjects,
  UploadPaper,
  ShowPaper,
  DeletePaper,
  UpdatePaper,
} = require("../controllers/PaperController");
const { upload } = require("../Middlewares/Upload");
const userVerification = require("../Middlewares/AuthMiddleware");
const { AuthorizeRoles } = require("../Middlewares/AuthorizeRoles");

router.post(
  "/upload",
  userVerification,
  AuthorizeRoles("manager", "admin"),
  upload,
  UploadPaper
);
router.get("/subjects", Subjects);
router.get(
  "/subjects/:id",
  userVerification,
  AuthorizeRoles("user", "manager", "admin"),
  ShowPaper
);
router.delete(
  "/subjects",
  userVerification,
  AuthorizeRoles("admin"),
  DeletePaper
);
router.put(
  "/subjects/update",
  userVerification,
  AuthorizeRoles("manager", "admin"),
  upload,
  UpdatePaper
);

module.exports = router;
