const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.BREVO_HOST,
      port: process.env.BREVO_PORT,
      auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS,
      },
      tls: { rejectUnauthorized: false },
    });

    const mailData = {
      from: '"GCET Paper\'s Hub" <mohammadnuman7788@gmail.com>',
      to,
      subject,
      html,
    };

    const info = await new Promise((resolve, reject) => {
      transporter.sendMail(mailData, (err, info) => {
        if (err) {
          console.error("❌ Email send error:", err);
          reject(err);
        } else {
          resolve(info);
        }
      });
    });

    console.log("✅ Email sent:", info.response);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = { sendEmail };
