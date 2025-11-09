require("dotenv").config();
module.exports.AuthorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!allowedRoles.includes(req.user.role)) {
         return res.status(403).json({
          success: false,
          message: `Only ${allowedRoles} can access this route.`

        });
      }
      next();
    } catch (err) {
       return res.status(500).json({ success: false, message: "Somthing went wrong", err });
    }
  };
};
