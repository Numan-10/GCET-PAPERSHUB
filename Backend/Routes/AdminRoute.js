const userVerification = require("../Middlewares/AuthMiddleware");
const { AuthorizeRoles } = require("../Middlewares/AuthorizeRoles");
const { ChangeRole,FetchUsers, DeleteUser} = require("../controllers/AdminController");
const router = require("express").Router();

router.get("/", FetchUsers);
router.delete("/:id", DeleteUser);
router.patch("/:id", ChangeRole);

module.exports = router;
