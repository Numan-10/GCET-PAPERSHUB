const oauth2Client = require("../utils/googleConfig");
const axios = require("axios");
const UserModel = require("../Models/User");
const jwt = require("jsonwebtoken");
const { createSecretToken } = require("../utils/SecretToken");
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
      if (!user) {
        user = await UserModel.create({
          email,
          username: name,
          image: picture,
        });
      }

      const { _id } = user;
      const token = createSecretToken({ _id, email, name });

      res.status(200).json({
        message: "Google Login Successful!",
        success: true,
        token,
        user,
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
