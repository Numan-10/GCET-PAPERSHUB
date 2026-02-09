// const nodemailer = require("nodemailer");
require("dotenv").config;
// async function sendEmail(email, title, body) {
//   try {
//     // const transporter = nodemailer.createTransport({
//     //   host: "smtp.gmail.com",
//     //   auth: {
//     //     user: process.env.EMAIL_USER,
//     //     pass: process.env.EMAIL_PASS,
//     //   },
//     // });
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com", // Or your email provider's SMTP host
//       port: 587,
//       secure: false, // Use false for STARTTLS
//       auth: {
//         user: process.env.EMAIL_USER, // Environment variable for email user
//         pass: process.env.EMAIL_PASS, // Environment variable for app password
//       },
//       tls: {
//         rejectUnauthorized: false, // May be necessary in some cases, but use with caution
//       },
//     });
//     const info = await transporter.sendMail({
//       from: "GCET Paper's Hub || By Numan_10",
//       to: email,
//       subject: title,
//       html: body,
//     });

//     return info;
//   } catch (error) {
//     console.error("Email send error:", error);
//   }
// }

// module.exports = sendEmail;

const nodemailer = require("nodemailer");

async function sendEmail(email, title, body) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
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
    // throw error;
  }
}

module.exports = sendEmail;