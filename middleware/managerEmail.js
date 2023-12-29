import nodemailer from "nodemailer";

export const managerEmailMessage = (managerEmail, managerPassword) => {
  let config = {
    service: "gmail",
    auth: {
      user: "smartparkingsystem7@gmail.com",
      pass: "wake fhej dzvb aoxm",
    },
    tls: {
      rejectUnauthorized: false,
    },
  };
  let transporter = nodemailer.createTransport(config);

  let message = {
    from: "smartparkingsystem7@gmail.com",
    to: managerEmail,
    subject:
      "Welcome to Smart Parking System - Your Gateway to Effortless Parking Management Partner.",

    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset - Smart Parking System</title>
    <style>
      body {
        background-color: hsl(230, 19%, 81%);
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
      }

      .header {
        background-color: hsl(210, 100%, 76%);
        padding: 20px;
        display: flex;
        align-items: center;
        padding: 2px 15%;
        padding-right: 25%;
        justify-content: space-between;
      }

      .header img {
        max-width: 200px;
        border-radius: 50%;
        height: auto;
        transition: all 0.3s ease-in-out;
      }

      .header h1 {
        color: hsl(328, 100%, 59%);
        font-size: 28px;
        font-weight: 700;
        margin: 0;
        padding-bottom: 10px;
        text-align: center;
      }

      .content {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: hsl(210, 60%, 98%);
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      h2 {
        color: hsl(60, 100%, 25%);
        font-size: 28px;
        margin: 0;
        padding-bottom: 10px;
        text-align: center;
      }

      p {
        color: hsl(0, 0%, 0%);
        font-size: 16px;
        margin: 0;
        text-align: left;
      }

      .otp-container {
        text-align: center;
      }

      .button-container {
        text-align: center;
        margin-top: 20px;
      }

      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: hsl(328, 100%, 59%);
        color: hsl(210, 60%, 98%);
        font-weight: bold;
        border-radius: 5px;
        text-decoration: none;
      }

      .button:hover {
        background-color: hsl(25, 100%, 50%);
      }

      .footer {
        text-align: left;
        padding: 20px 5%;
        margin-top: 20px;
        font-size: 12px;
        color: hsl(0, 0%, 0%);
      }
    </style>
  </head>
  <body>
    <div class="header">
      <a href="https://smart-parking-system.com">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWtvKgAkMj_gzrRKUkaonxClNNp3evQwwdmPox9nDg&s"
          alt="Smart Parking System logo"
        />
      </a>
      <h1>Smart Parking System</h1>
    </div>
    <div class="content">
      <h2>Login Credentials</h2>
      <p>
        Dear valued partner,
        <br /><br />
        Welcome to Smart Parking System! We're delighted to have you on board,
        and we're confident that your journey with us will redefine your parking experience.
        <br /><br />
        To access your account, please use the following login credentials:
      </p>
      <br /><br />
      <div class="otp-container">
        <strong>Email:</strong> ${managerEmail}
        <br /><br />
        <strong>Password:</strong> ${managerPassword}
        <br /><br />
      </div>
      <p>Should you have any questions or require assistance, our support team is
        ready to help you.
        </p><br /><br />
        <p>Best regards,</p>
        <br /><br />
      </div>
    </div>
  </body>
</html>



`,
  };

  transporter.sendMail(message);
};
