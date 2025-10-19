import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host:'localHost',
    port:587,
    secure:false,
    auth:{
        user:"abdofatah410@gmail.com",
        pass:""
    }
});

export async function sendMail({ to, subject, text, html }) {
  try {
    const info = await transporter.sendMail({
      from:"abdofatah410@gmail.com",
      to,
      subject,
      text,
      html
    });
    return info;
  } catch (err) {
    // Log and rethrow so caller can handle (e.g., continue without failing request)
    console.error("Mail send failed:", err);
    throw err;
  }
}