const User = require("../Models/User");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcrypt");
const speakeasy = require("speakeasy");
const dotenv = require("dotenv");
const { sendEmail } = require("../utils/emailService");
const { createActivity } = require("./ActivityController");

dotenv.config();

let totpStore = {}; // TEMP in-memory storage

// ---------------- Signup ----------------
module.exports.Signup = async (req, res) => {
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

    await createActivity("Signed Up", user.username, user.email);

    return res
      .status(201)
      .json({ message: "Signup successful", success: true });
  } catch (error) {
    console.error("Signup Error:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

// ---------------- Login ----------------
module.exports.Login = async (req, res) => {
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
    if (!password || !user.password) {
      return res.status(400).json({ message: "Password missing or invalid" });
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

    await sendEmail(
      email,
      "Your OTP Code",
      `<div style="font-family:'Segoe UI', Arial, sans-serif; max-width:560px; margin:auto; background:linear-gradient(135deg,#f0f7ff,#ffffff); border:1px solid #e0e6ed; border-radius:14px; box-shadow:0 8px 24px rgba(0,0,0,0.08); padding:26px;">
  <!-- Header -->
  <div style="text-align:center; margin-bottom:18px;">
    <img src="https://gcet-papershub.vercel.app/Assets/codeclubW.jpg" alt="GCET Papers Hub" width="72" height="72" style="width:72px;border-radius:6px; height:72px; object-fit:cover; margin-bottom:10px;" />
    <h2 style="color:#1a237e; margin:0; font-size:22px; font-weight:700;">📘 GCET Paper's Hub</h2>
    <p style="color:#586174; font-size:14px; margin:6px 0 0;">Your trusted hub for notes & previous year papers</p>
  </div>

  <!-- Greeting -->
  <p style="font-size:15px; color:#2f3949; line-height:1.6; text-align:center; margin:10px 0;">
    Hello 👋, use the One-Time Password below to continue securely.
  </p>

  <!-- OTP Box -->
  <div style="background:#1a73e8; color:#ffffff; padding:16px 22px; border-radius:10px; text-align:center; margin:18px 0; font-size:28px; font-weight:800; letter-spacing:8px;">
    ${totp}
  </div>

  <!-- Warning -->
  <p style="font-size:14px; color:#e53935; text-align:center; margin:14px 0 0;">
    ⚠️ This OTP expires in <b>5 minutes</b>. Do not share it with anyone.
  </p>

  <!-- Tips (optional) -->
  <div style="background:#f7fafc; border:1px solid #e6ecf2; border-radius:10px; padding:12px 14px; margin:18px 0;">
    <p style="margin:0; color:#475569; font-size:13px; line-height:1.6; text-align:center;">
      Didn’t request this? You can ignore this email, or secure the account by changing the password.
    </p>
  </div>

  <!-- Footer -->
  <hr style="margin:24px 0; border:none; border-top:1px solid #e3e8ef;" />
  <p style="font-size:12px; text-align:center; color:#6b7280; margin:0;">
    &copy; ${new Date().getFullYear()} GCET Paper's Hub. All rights reserved. Built with ❤️ for GCET students.
  </p>
</div>
`
    );

    return res.json({ message: "OTP sent to your email", success: true });
  } catch (err) {
    console.error("Login Error:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

// ---------------- Verify Login OTP ----------------
module.exports.Verify = async (req, res) => {
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
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    delete totpStore[email];

    const Token = createSecretToken(existingUser._id, existingUser.role);

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
    console.error("Verify OTP Error:", err);
    return res.json({ message: `${err.message}`, success: false });
  }
};

// ---------------- Resend OTP ----------------
module.exports.ResendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const totp = speakeasy.totp({
      secret: process.env.TOKEN_KEY,
      digits: 4,
      step: 300,
    });
    totpStore[email] = totp;

    await sendEmail(
      email,
      "Resent OTP Code",
      `<div style="font-family:'Segoe UI', Arial, sans-serif; max-width:560px;  margin:auto; background:linear-gradient(135deg,#f0f7ff,#ffffff); border:1px solid #e0e6ed; border-radius:14px; box-shadow:0 8px 24px rgba(0,0,0,0.08); padding:26px;">
  <!-- Header -->
  <div style="text-align:center; margin-bottom:18px;">
    <img src="https://gcet-papershub.vercel.app/Assets/codeclubW.jpg" alt="GCET Papers Hub" width="72" height="72" style="width:72px; height:72px; object-fit:cover;border-radius:6px; margin-bottom:10px;" />
    <h2 style="color:#1a237e; margin:0; font-size:22px; font-weight:700;">📘 GCET Paper's Hub</h2>
    <p style="color:#586174; font-size:14px; margin:6px 0 0;">Your trusted hub for notes & previous year papers</p>
  </div>

  <!-- Greeting -->
  <p style="font-size:15px; color:#2f3949; line-height:1.6; text-align:center; margin:10px 0;">
    Hello 👋, use the One-Time Password below to continue securely.
  </p>

  <!-- OTP Box -->
  <div style="background:#1a73e8; color:#ffffff; padding:16px 22px; border-radius:10px; text-align:center; margin:18px 0; font-size:28px; font-weight:800; letter-spacing:8px;">
    ${totp}
  </div>


  <!-- Warning -->
  <p style="font-size:14px; color:#e53935; text-align:center; margin:14px 0 0;">
    ⚠️ This OTP expires in <b>5 minutes</b>. Do not share it with anyone.
  </p>

  <!-- Tips (optional) -->
  <div style="background:#f7fafc; border:1px solid #e6ecf2; border-radius:10px; padding:12px 14px; margin:18px 0;">
    <p style="margin:0; color:#475569; font-size:13px; line-height:1.6; text-align:center;">
      Didn’t request this? You can ignore this email, or secure the account by changing the password.
    </p>
  </div>

  <!-- Footer -->
  <hr style="margin:24px 0; border:none; border-top:1px solid #e3e8ef;" />
  <p style="font-size:12px; text-align:center; color:#6b7280; margin:0;">
    &copy; ${new Date().getFullYear()} GCET Paper's Hub. All rights reserved. Built with ❤️ for GCET students.
  </p>
</div>
`
    );

    return res.json({ message: "OTP Sent!", success: true });
  } catch (err) {
    console.error("Resend OTP Error:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

// ---------------- Reset Password Flow ----------------
module.exports.SendCode = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.json({ message: "Email is required!", success: false });

    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.json({ message: "User doesn't exist!", success: false });

    const totp = speakeasy.totp({
      secret: process.env.TOKEN_KEY,
      digits: 4,
      step: 300,
    });
    totpStore[email] = totp;

    await sendEmail(
      email,
      "Reset Your Password - GCET Paper's Hub",
      `<div style="font-family:'Segoe UI', Arial, sans-serif; max-width:560px; margin:auto; background:linear-gradient(135deg,#f0f7ff,#ffffff); border:1px solid #e0e6ed;  box-shadow:0 8px 24px rgba(0,0,0,0.08); padding:26px;">
  <!-- Header -->
  <div style="text-align:center; margin-bottom:18px;">
    <img src="https://gcet-papershub.vercel.app/Assets/codeclubW.jpg" alt="GCET Papers Hub" width="72" height="72" border-radius:6px; style="width:72px; height:72px; object-fit:cover; margin-bottom:10px;" />
    <h2 style="color:#1a237e; margin:0; font-size:22px; font-weight:700;">📘 GCET Paper's Hub</h2>
    <p style="color:#586174; font-size:14px; margin:6px 0 0;">Your trusted hub for notes & previous year papers</p>
  </div>

  <!-- Greeting -->
  <p style="font-size:15px; color:#2f3949; line-height:1.6; text-align:center; margin:10px 0;">
    Hello 👋, use the One-Time Password below to continue securely.
  </p>

  <!-- OTP Box -->
  <div style="background:#1a73e8; color:#ffffff; padding:16px 22px; border-radius:10px; text-align:center; margin:18px 0; font-size:28px; font-weight:800; letter-spacing:8px;">
    ${totp}
  </div>

 

  <!-- Warning -->
  <p style="font-size:14px; color:#e53935; text-align:center; margin:14px 0 0;">
    ⚠️ This OTP expires in <b>5 minutes</b>. Do not share it with anyone.
  </p>

  <!-- Tips (optional) -->
  <div style="background:#f7fafc; border:1px solid #e6ecf2; border-radius:10px; padding:12px 14px; margin:18px 0;">
    <p style="margin:0; color:#475569; font-size:13px; line-height:1.6; text-align:center;">
      Didn’t request this? You can ignore this email, or secure the account by changing the password.
    </p>
  </div>

  <!-- Footer -->
  <hr style="margin:24px 0; border:none; border-top:1px solid #e3e8ef;" />
  <p style="font-size:12px; text-align:center; color:#6b7280; margin:0;">
    &copy; ${new Date().getFullYear()} GCET Paper's Hub. All rights reserved. Built with ❤️ for GCET students.
  </p>
</div>
`
    );

    return res.json({ message: "OTP Sent!", success: true });
  } catch (err) {
    console.error("SendCode Error:", err);
    return res.json({ message: err.message, success: false });
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
    if (!existingUser)
      return res
        .status(400)
        .json({ message: "User not found", success: false });

    delete totpStore[email];

    return res.json({ message: "Verified!", success: true });
  } catch (err) {
    console.error("VerifyResetOtp Error:", err);
    return res.json({ message: `${err.message}`, success: false });
  }
};

module.exports.ChangePass = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword)
      return res.json({ success: false, message: "Missing fields" });

    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    delete totpStore[email];
    await createActivity("Reseted Password", user.username, user.email);

    res.json({ success: true, message: "Password changed successfully!" });
  } catch (err) {
    console.error("ChangePass Error:", err);
    res.json({ success: false, message: "Error changing password" });
  }
};
