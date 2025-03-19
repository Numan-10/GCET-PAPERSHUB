require("dotenv").config();
module.exports.isAdmin = (req, res, next) => {
  const adminEmail = process.env.EMAIL_ID;
  const currUser = req.user;
  if (req.user && req.user.email === adminEmail) {
    next();
  } else {
    return res.status(403).json({
      status: false,
      message: "Access denied. Admins only.",
      email: currUser.email,
    });
  }
};
