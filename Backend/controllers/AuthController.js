const User = require("../Models/User");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcrypt");
const speakeasy = require("speakeasy");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;

    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      password: hashedPassword,
      username,
      createdAt,
    });
    await user.save();

    return res
      .status(201)
      .json({ message: "Signup successful", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

let totpStore = {};
module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(403)
        .json({ message: "Incorrect password or email", success: false });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res
        .status(403)
        .json({ message: "Incorrect password or email", success: false });
    }

    const totp = speakeasy.totp({
      secret: process.env.TOKEN_KEY,
      digits: 6,
      step: 300,
    });
    console.log(totp);
    totpStore[email] = totp;
    // totpStore[email] = email;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      html: `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 550px; margin: auto; background: linear-gradient(135deg, #f0f7ff, #ffffff); border: 1px solid #e0e6ed; border-radius: 12px; box-shadow: 0 6px 20px rgba(0,0,0,0.1); padding: 25px;">

  <!-- Header -->
  <div style="text-align: center; margin-bottom: 20px;">
    <img src="https://gcet-papershub.vercel.app/Assets/codeclubW.jpg" alt="GCET Papers Hub" style="width: 70px; margin-bottom: 10px;" />
    <h2 style="color: #1a237e; margin: 0; font-size: 22px; font-weight: 700;">
      📘 GCET Paper's Hub
    </h2>
    <p style="color: #555; font-size: 14px; margin: 5px 0 0;">
      Your trusted hub for notes & previous year papers
    </p>
  </div>

  <!-- OTP Box -->
  <div style="background: #1a73e8; color: white; padding: 15px 20px; border-radius: 8px; text-align: center; margin: 20px 0; font-size: 26px; font-weight: bold; letter-spacing: 6px;">
    ${totp}
  </div>

  <!-- Message -->
  <p style="font-size: 16px; color: #333; line-height: 1.6; text-align: center;">
    Hello 👋,  
    Use the above One-Time Password (OTP) to log in securely to your <b>GCET Paper’s Hub</b> account.
  </p>

  <!-- Warning -->
  <p style="font-size: 14px; color: #e53935; text-align: center; margin-top: 10px;">
    ⚠️ This OTP will expire in <b>5 minutes</b>. Do not share it with anyone!
  </p>

  <!-- Footer -->
  <hr style="margin: 25px 0; border: none; border-top: 1px solid #ddd;" />
  <p style="font-size: 12px; text-align: center; color: #777;">
    &copy; ${new Date().getFullYear()} GCET Paper's Hub. All rights reserved.  
    Built with ❤️ for GCET students.
  </p>
</div>

  `,
    });
    return res.json({ message: "OTP sent to your email", success: true });

    // const JwtToken = createSecretToken(user._id, user.email, user.username);
    // return res.status(200).json({
    //   message: "Logged in successfully",
    //   success: true,
    //   JwtToken,
    //   email: user.email,
    //   name: user.username,
    // });
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false,email });
  }
};

module.exports.Verify = async (req, res) => {
  try {
    const { otp,email } = req.body;
  
    console.log(otp,email);
    const verified = speakeasy.totp.verify({
      secret: process.env.TOKEN_KEY,
      token: otp,
      step: 300,
      window: 0, //doesn't accept the token from 1 step before or after
    });

    if (!verified || totpStore[email] != otp) {
      return res
        .status(400)
        .json({ message: "Invalid or expired OTP", success: false });
    }
    // delete totpStore[email];
    // let email = totpStore[email];
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }
    delete totpStore[email];
    // email = null;
    const Token = createSecretToken(existingUser._id);
    return res.json({
      message: "Successfully logged in",
      Token,
      success: true,
    });
  } catch (err) {
    return res.json({ message: `${err.message}`, success: false });
  }
};
