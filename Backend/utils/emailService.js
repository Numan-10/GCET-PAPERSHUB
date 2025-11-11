const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    const mailData = {
      from: `"GCET Paper's Hub" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    const info = await new Promise((resolve, reject) => {
      transporter.sendMail(mailData, (err, info) => {
        if (err) {
          console.error("Email send error:", err);
          reject(err);
        } else {
          resolve(info);
        }
      });
    });

    console.log("Email sent:", info.response);
    return true;
  } catch (error) {
    console.error("Unexpected error:", error);
    return false;
  }
};

module.exports = { sendEmail };
