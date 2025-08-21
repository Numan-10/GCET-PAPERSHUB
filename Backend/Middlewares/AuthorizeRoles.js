require("dotenv").config();
module.exports.AuthorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!allowedRoles.includes(req.user.role)) {
        return res.json({
          message: `This Route is accessible only to ${allowedRoles} not to ${req.user.role} `,
        });
      }
      next();
    } catch (err) {
      return res.json({ message: "Somthing went wrong", err });
    }
  };
};
