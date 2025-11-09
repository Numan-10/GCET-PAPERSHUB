const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(to, subject, html) {
  try {
    const { data, error } = await resend.emails.send({
      from: "GCET-Unofficial <onboarding@resend.dev>",
      to,
      subject,
      html,
    });
    if (error) throw error;
    console.log("Email sent successfully:", data.id);
  } catch (err) {
    console.error("Email Sending Failed:", err);
  }
}

module.exports = { sendEmail };
