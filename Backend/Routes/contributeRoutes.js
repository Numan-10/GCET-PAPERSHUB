const express = require("express");
const router = express.Router();
const { upload } = require("../Middlewares/Upload");
const userVerification = require("../Middlewares/AuthMiddleware");
const { AuthorizeRoles } = require("../Middlewares/AuthorizeRoles");
const {
  UploadContributeNotes,
  GetAllContributions,
  DeleteContribution,
} = require("../controllers/contributeController");

router.post(
  "/contributeNotes",
  userVerification,
  AuthorizeRoles("user", "manager", "admin"),
  upload,
  UploadContributeNotes
);

// Route to get all contributions (admin only)
router.get(
  "/admin/contributions",
  userVerification,
  AuthorizeRoles("manager", "admin"),
  GetAllContributions
);

// Route to delete contribution (admin only)
router.delete(
  "/admin/contributions/delete/:id",
  userVerification,
  AuthorizeRoles("admin"),
  DeleteContribution
);

module.exports = router;
