import nodemailer from "nodemailer";
import { catchAsyncError } from "../utility";

export const resetPasswordEmail = catchAsyncError(async (option) => {
  let config = {
    host: process.env.Email_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      ciphers: "SSLv3",
    },
  };
  let transporter = nodemailer.createTransport(config);

  let message = {
    from: "drParking support<support@drParking.com",
    to: option.email,
    subject: option.subject,

    text: option.message,
  };

  await transporter.sendMail(message);

  console.log("Sent");
});
