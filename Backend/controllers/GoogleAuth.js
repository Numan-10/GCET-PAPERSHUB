import dotenv from "dotenv";
dotenv.config();
const oauth2Client = require("../utils/googleConfig");
import axios from "axios";
module.exports.GoogleAuth = async (req, res) => {
  const GoogleUrl = process.env.GOOGLE_SCOPE;
  try {
    const code = req.query;
    if (code) {
      const Token = code.code;
      console.log("Token Controller: ", Token);
      const { tokens } = await oauth2Client.getToken(Token);
      //   console.log(Response);
      oauth2Client.setCredentials(tokens);

      const UserData = axios.get(`${GoogleUrl}${tokens.access_token}`);
      console.log(UserData);
    }
  } catch (err) {
    console.log(err);
  }
};
