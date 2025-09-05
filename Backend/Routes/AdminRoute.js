const userVerification = require("../Middlewares/AuthMiddleware");
const { AuthorizeRoles } = require("../Middlewares/AuthorizeRoles");
// const { BugReportsValidation } = require("../Middlewares/ValidationMiddleware");
const {
  ChangeRole,
  FetchUsers,
  DeleteUser,
  PostBug,
  FetchBugs,
  DeleteBug,
} = require("../controllers/AdminController");
const { FetchActivites } = require("../controllers/ActivityController");
const router = require("express").Router();

router.get("/user", userVerification, FetchUsers);
router.get("/user/activities", userVerification, FetchActivites);
router.delete(
  "/user/:id",
  userVerification,
  AuthorizeRoles("admin"),
  DeleteUser
);
router.patch(
  "/user/:id",
  userVerification,
  AuthorizeRoles("admin"),
  ChangeRole
);

// <<<<<<<<<<<<<<<<<<<< Bug >>>>>>>>>>>>>>>>>>>>>>>
// Posting bug
router.post(
  "/bug-report",
  userVerification,
  //   BugReportsValidation,
  AuthorizeRoles("user", "manager", "admin"),
  PostBug
);
router.get(
  "/FetchBugs",
  userVerification,
  //   BugReportsValidation,
  AuthorizeRoles("manager", "admin"),
  FetchBugs
);

router.delete(
  "/delete/:id",
  userVerification,
  AuthorizeRoles("admin"),
  DeleteBug
);
module.exports = router;
