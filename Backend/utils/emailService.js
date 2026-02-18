require("dotenv").config();
const nodemailer = require("nodemailer");

async function sendEmail(email, title, body) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: true, 
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });
    await transporter.verify();
    const info = await transporter.sendMail({
      from: "GCET Paper's Hub || By Numan_10",
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email sent successfully:", info.messageId);
    return true;

  } catch (error) {
    console.error("Email sending failed:", error.message);
    return false;
  }
}

module.exports = sendEmail;
