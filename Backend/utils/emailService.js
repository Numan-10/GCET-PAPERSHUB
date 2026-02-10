require("dotenv").config();
const nodemailer = require("nodemailer");

async function sendEmail(email, title, body) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: "GCET Paper's Hub || By Numan_10",
      to: email,
      subject: title,
      html: body,
    });

    return info;
  } catch (error) {
    console.error("Email send error:", error);
  }
}

module.exports = sendEmail;
