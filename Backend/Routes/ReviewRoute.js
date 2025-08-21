const router = require("express").Router();
const { ReviewController } = require("../controllers/ReviewController");
const userVerification = require("../Middlewares/AuthMiddleware");
const { AuthorizeRoles } = require("../Middlewares/AuthorizeRoles");
router.post(
  "/",
  userVerification,
  AuthorizeRoles("user", "admin"),
  ReviewController
);

module.exports = router;