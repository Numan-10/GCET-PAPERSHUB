const oauth2Client = require("../utils/googleConfig");
const axios = require("axios");
const UserModel = require("../Models/User");
const jwt = require("jsonwebtoken");
const { createSecretToken } = require("../utils/SecretToken");
const { createActivity } = require("./ActivityController");
module.exports.GoogleAuth = async (req, res) => {
  const GoogleUrl = process.env.GOOGLE_SCOPE;
  try {
    const code = req.query;
    if (code) {
      const Token = code.code;

      const { tokens } = await oauth2Client.getToken(Token);

      oauth2Client.setCredentials(tokens);

      const UserData = await axios.get(`${GoogleUrl}${tokens.access_token}`);

      const { email, name, picture } = UserData.data;

      let user = await UserModel.findOne({ email });
      console.log(user);
      if (!user) {
        user = await UserModel.create({
          email,
          username: name,
          image: picture,
        });
      }

      const token = createSecretToken(user._id, user.role);

      await createActivity("Google Login", user.username, user.email);
      return res.json({
        message: "Google Login Successful!",
        token,
        success: true,
        user: user.username,
        role: user.role,
      });

    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
