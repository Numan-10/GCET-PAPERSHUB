const router = require("express").Router();
const { upload } = require("../Middlewares/Upload");
const userVerification = require("../Middlewares/AuthMiddleware");
const { AuthorizeRoles } = require("../Middlewares/AuthorizeRoles");

const {
  Content,
  Units,
  newSubject,
  newUnit,
} = require("../controllers/ContentController");
router.get("/", Content);
router.get("/:subject",userVerification,AuthorizeRoles("user", "admin"),Units);
router.post("/new", userVerification, AuthorizeRoles("admin"), newSubject);
router.post("/:sub/new",userVerification,AuthorizeRoles("admin"),upload,newUnit);

module.exports = router;
