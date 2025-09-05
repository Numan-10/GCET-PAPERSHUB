const router = require("express").Router();
const {
  submitReview,
  fetchReviews,
  deleteReview,
} = require("../controllers/ReviewController");
const userVerification = require("../Middlewares/AuthMiddleware");
const { AuthorizeRoles } = require("../Middlewares/AuthorizeRoles");
router.get("/", fetchReviews);
router.post(
  "/",
  userVerification,
  AuthorizeRoles("user","manager", "admin"),
  submitReview
);
router.delete("/:id", deleteReview);

module.exports = router;
