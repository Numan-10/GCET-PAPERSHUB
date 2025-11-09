const userVerification = require("../Middlewares/AuthMiddleware");
const { AuthorizeRoles } = require("../Middlewares/AuthorizeRoles");

const {
  ChangeRole,
  FetchUsers,
  DeleteUser,
  PostBug,
  FetchBugs,
  DeleteBug,
  fetchNotification,
  createNotification,
  updateNotification,
  deleteNotification,
  getGrowthData
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

// Notification routes
router.get("/notifications", fetchNotification);

router.post(
  "/notifications",
  userVerification,
  AuthorizeRoles("manager", "admin"),
  createNotification
);

router.put(
  "/notifications/:id",
  userVerification,
  AuthorizeRoles("manager", "admin"),
  updateNotification
);

router.delete(
  "/notifications/:id",
  userVerification,
  AuthorizeRoles("manager", "admin"),
  deleteNotification
);

// Growth Dashboard
router.get(
  "/growth",
  userVerification,
  AuthorizeRoles("admin", "manager"),
  getGrowthData
);



module.exports = router;
