const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

// Create a reusable transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // use 465 if you want SSL
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // MUST be a Gmail App Password
  },
});

// Check connection
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Connection Failed:", error);
  } else {
    console.log("SMTP Server is ready to send emails");
  }
});

// Send Email function
async function sendEmail(to, subject, html) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
    return info;
  } catch (error) {
    console.error("Email Sending Failed:", error);
    throw error;
  }
}

module.exports = { sendEmail };
