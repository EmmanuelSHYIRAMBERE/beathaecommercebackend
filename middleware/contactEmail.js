import nodemailer from "nodemailer";

export const replyEmail = (userEmail, replyMessage) => {
  let config = {
    service: "gmail",
    auth: {
      user: process.env.Email,
      pass: process.env.Password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  };
  let transporter = nodemailer.createTransport(config);

  let message = {
    from: process.env.Email,
    to: userEmail,
    subject:
      "Thank you for connect with Holidays Planners - Your request Has Been Received",
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your request Has Been Received to Smart Parking System</title>

    <style>
      body {
        background-color: #f5f5f5;
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
      }

      .header {
        background-color: #009688;
        padding: 20px;
        text-align: center;
      }

      .header img {
        max-width: 200px;
        height: auto;
      }

      .content {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      h1 {
        color: #333;
        font-size: 28px;
        margin: 0;
        padding-bottom: 10px;
        text-align: center;
      }

      p {
        color: #666;
        font-size: 16px;
        margin: 0;
        text-align: center;
      }

      .button-container {
        text-align: center;
        margin-top: 20px;
      }

      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #009688;
        color: #fff;
        font-weight: bold;
        border-radius: 5px;
        text-decoration: none;
      }

      .button:hover {
        background-color: #007a6e;
      }

      .footer {
        text-align: center;
        margin-top: 20px;
        font-size: 12px;
        color: #999;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <a
        href="#"
        ><img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWtvKgAkMj_gzrRKUkaonxClNNp3evQwwdmPox9nDg&s"
          alt="Smart Parking System logo"
        /></a>
    </div>
    <div class="content">
      <h1>Thank you for contacting Smart Parking System!</h1>
      <p>
        ${replyMessage},<br /><br />
      </p>
    </div>
    <div class="footer">
      Thank you for choosing Smart Parking System to simplify your parking
      experience. We look forward to providing you with seamless parking
      solutions that enhance your daily commute. Explore the features and
      functionalities of our platform. If you have any questions or need
      assistance, feel free to reach out. We are here to make your parking
      experience as efficient and enjoyable as possible.<br /><br />

      Best regards,
    </div>
    <div></div>
  </body>
</html>
`,
  };

  transporter.sendMail(message);
};
