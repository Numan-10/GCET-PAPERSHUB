const userVerification = require("../Middlewares/AuthMiddleware");
const { AuthorizeRoles } = require("../Middlewares/AuthorizeRoles");
const { ChangeRole,FetchUsers, DeleteUser} = require("../controllers/AdminController");
const {FetchActivites} =require("../controllers/ActivityController")
const router = require("express").Router();

router.get("/", FetchUsers);
router.get("/activities", FetchActivites);
router.delete("/:id", DeleteUser);
router.patch("/:id", ChangeRole);

module.exports = router;
