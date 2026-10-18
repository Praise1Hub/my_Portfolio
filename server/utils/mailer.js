import nodemailer from "nodemailer";

let transporter = null;

// Returns true when email credentials are present in .env
export const emailConfigured = () =>
  Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS);

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || "gmail",
      // Fail fast so a slow mail server never leaves the visitor waiting
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail: use an App Password, not your login password
      },
    });
  }
  return transporter;
};

const escapeHtml = (str) =>
  str.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );

export const sendContactEmail = async ({ name, email, message }) => {
  const to = process.env.EMAIL_TO || process.env.EMAIL_USER;

  await getTransporter().sendMail({
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to,
    replyTo: email, // hitting Reply in your inbox answers the visitor directly
    subject: `New portfolio message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `
      <h3>New message from your portfolio</h3>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
    `,
  });
};
