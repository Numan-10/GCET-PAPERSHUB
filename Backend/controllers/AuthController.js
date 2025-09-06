const User = require("../Models/User");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcrypt");
const speakeasy = require("speakeasy");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
// const Activity = require("../Models/RecentActivity");
const { createActivity } = require("./ActivityController");

dotenv.config();
module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt, role } = req.body;

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
      role,
    });
    await user.save();

    //Tracking Activity
    await createActivity("Signed Up", user.username, user.email);

    return res
      .status(201)
      .json({ message: "Signup successful", success: true });
  } catch (error) {
    console.log(error);
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
      digits: 4,
      step: 300,
    });

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
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

module.exports.Verify = async (req, res) => {
  try {
    const { otp, email } = req.body;
    const verified = speakeasy.totp.verify({
      secret: process.env.TOKEN_KEY,
      token: otp,
      step: 300,
      window: 0, //doesn't accept the token from 1 step before or after
      digits: 4,
    });

    if (!verified || totpStore[email] != otp) {
      return res
        .status(400)
        .json({ message: "Invalid or expired OTP", success: false });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }
    delete totpStore[email];
    // email = null;
    const Token = createSecretToken(existingUser._id, existingUser.role);

    //Tracking Activity
    await createActivity(
      "Logged in",
      existingUser.username,
      existingUser.email
    );
    return res.json({
      message: "Successfully logged in",
      Token,
      success: true,
      user: existingUser.username,
      role: existingUser.role,
    });
  } catch (err) {
    return res.json({ message: `${err.message}`, success: false });
  }
};

// Resendotp
module.exports.ResendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const totp = speakeasy.totp({
      secret: process.env.TOKEN_KEY,
      digits: 4,
      step: 300,
    });

    totpStore[email] = totp;

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
      subject: "Your Resent OTP Code",
      html: `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 550px; margin: auto; background: linear-gradient(135deg, #f9fbff, #ffffff); border: 1px solid #e0e6ed; border-radius: 12px; box-shadow: 0 6px 20px rgba(0,0,0,0.1); padding: 25px;">

    <!-- Header -->
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://gcet-papershub.vercel.app/Assets/codeclubW.jpg" alt="GCET Papers Hub" style="width: 70px; margin-bottom: 10px;" />
      <h2 style="color: #1a237e; margin: 0; font-size: 22px; font-weight: 700;">
        🔄 Resent OTP - GCET Paper's Hub
      </h2>
      <p style="color: #555; font-size: 14px; margin: 5px 0 0;">
        Here’s your new OTP to continue securely.
      </p>
    </div>

    <!-- OTP Box -->
    <div style="background: #1a73e8; color: white; padding: 15px 20px; border-radius: 8px; text-align: center; margin: 20px 0; font-size: 26px; font-weight: bold; letter-spacing: 6px;">
      ${totp}
    </div>

    <!-- Message -->
    <p style="font-size: 16px; color: #333; line-height: 1.6; text-align: center;">
      Hi 👋,  
      As requested, we’ve resent your <b>One-Time Password (OTP)</b>.  
      Use it to log in securely to your <b>GCET Paper’s Hub</b> account.
    </p>

    <!-- Warning -->
    <p style="font-size: 14px; color: #e53935; text-align: center; margin-top: 10px;">
      ⚠️ This OTP will expire in <b>5 minutes</b>. If you didn’t request this, please ignore this email.
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
    return res.json({ message: "OTP Sent!", success: true });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};
// REset password
module.exports.SendCode = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.json({ message: "Email is required!", successs: false });
    }

    const existingUser = await User.findOne({ email: email });
    // console.log(existingUser);
    if (!existingUser) {
      return res.json({ message: "User doesn't exist!", success: false });
    }
    const totp = speakeasy.totp({
      secret: process.env.TOKEN_KEY,
      digits: 4,
      step: 300,
    });

    totpStore[email] = totp;

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
      subject: "Reset Your Password - GCET Paper's Hub",
      html: `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 550px; margin: auto; background: linear-gradient(135deg, #f9fbff, #ffffff); border: 1px solid #e0e6ed; border-radius: 12px; box-shadow: 0 6px 20px rgba(0,0,0,0.1); padding: 25px;">

    <!-- Header -->
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://gcet-papershub.vercel.app/Assets/codeclubW.jpg" alt="GCET Papers Hub" style="width: 70px; margin-bottom: 10px;" />
      <h2 style="color: #1a237e; margin: 0; font-size: 22px; font-weight: 700;">
        🔒 Password Reset - GCET Paper's Hub
      </h2>
      <p style="color: #555; font-size: 14px; margin: 5px 0 0;">
        You requested to reset your password. Use the code below to proceed.
      </p>
    </div>

    <!-- OTP / Reset Code Box -->
    <div style="background: #1a73e8; color: white; padding: 15px 20px; border-radius: 8px; text-align: center; margin: 20px 0; font-size: 26px; font-weight: bold; letter-spacing: 6px;">
      ${totp}
    </div>

    <!-- Message -->
    <p style="font-size: 16px; color: #333; line-height: 1.6; text-align: center;">
      Hi 👋,  
      Use the above <b>Reset Code</b> to securely change your password for your <b>GCET Paper’s Hub</b> account.  
      Enter this code on the reset password page to continue.
    </p>

    <!-- Warning -->
    <p style="font-size: 14px; color: #e53935; text-align: center; margin-top: 10px;">
      ⚠️ This code will expire in <b>5 minutes</b>. If you didn’t request a password reset, please ignore this email.
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

    return res.json({ message: "OTP  Sent!", success: true });
  } catch (err) {
    return res.json({ message: err?.message, success: false });
  }
};

module.exports.VerifyResetOtp = async (req, res) => {
  try {
    const { otp, email } = req.body;
    const verified = speakeasy.totp.verify({
      secret: process.env.TOKEN_KEY,
      token: otp,
      step: 300,
      window: 0,
      digits: 4,
    });

    if (!verified || totpStore[email] != otp) {
      return res
        .status(400)
        .json({ message: "Invalid or expired OTP", success: false });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ success: false });
    }
    delete totpStore[email];

    return res.json({
      message: "Verfied!",

      success: true,
    });
  } catch (err) {
    return res.json({ message: `${err.message}`, success: false });
  }
};

module.exports.ChangePass = async (req, res, next) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword)
    return res.json({ success: false, message: "Missing fields" });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });
    const hashedPass = await bcrypt.hash(newPassword, 10);
    user.password = hashedPass;

    await user.save();
    //Tracking Activity
    await createActivity(
      "Reseted Password",
      user.username,
      user.email
    );
    res.json({ success: true, message: "Password changed successfully!" });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Error changing password" });
  }
};
