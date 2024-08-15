const nodemailer = require("nodemailer");
const { smtpUsername, smtpPasword } = require("../secret");
const { logger } = require("../controller/loggerController");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: smtpUsername,
    pass: smtpPasword,
  },
});

const emailWithNodeMailer = async (emailData) => {
  try {
    const mailOptions = {
      from: smtpUsername, // sender address
      to: emailData.email, // list of receivers
      subject: emailData.subject, // Subject line
      html: emailData.html, // html body
    };
    const info = await transporter.sendMail(mailOptions);
    logger.log("info","Message sent: %s", info.messageId);
  } catch (error) {
    logger.log("error","Error occured while sending email:", error.toString());
    throw error;
  }
};

module.exports = { emailWithNodeMailer };
