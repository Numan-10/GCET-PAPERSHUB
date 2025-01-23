module.exports.isAdmin = (req, res, next) => {
  const adminEmail = "9256fa@gmail.com";
  const currUser = req.user;
  if (req.user && req.user.email === adminEmail) {
    res.json({ status: true, user: currUser.username, email: currUser.email });
  } else {
    return res.status(403).json({
      status: false,
      message: "Access denied. Admins only.",
      email: currUser.email,
    });
  }
};
