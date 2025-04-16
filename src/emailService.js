const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: `"Your Shop" <${process.env.EMAIL}>`,
      to,
      subject,
      text,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    return result;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
};

module.exports = sendEmail;
