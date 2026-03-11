const User = require("../Models/User");
const { clearAuthCookies } = require("../utils/authCookies");

module.exports.Session = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("username role email");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      authenticated: true,
      user: user.username,
      role: user.role,
      email: user.email,
      id: user._id,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch session" });
  }
};

module.exports.Logout = async (req, res) => {
  clearAuthCookies(res);
  return res.json({ success: true, message: "Logged out successfully" });
};
