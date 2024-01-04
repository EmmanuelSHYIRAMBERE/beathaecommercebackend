import nodemailer from "nodemailer";

export const sendEmail = (userEmail, userNames) => {
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
      "Welcome to Smart Parking System - Your Gateway to Effortless Parking",

    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Smart Parking System</title>

    <style>
      body {
        background-color: hsl(230, 19%, 81%); /* Light Gray */
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
      }

      .header {
        background-color: hsl(210, 100%, 76%); /* Blue */
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
        transition: all 0.3s ease-in-out; /* Add a smooth transition effect */
      }

      .header h1 {
        color: hsl(328, 100%, 59%); /* Dark Gray */
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
        background-color: hsl(210, 60%, 98%); /* White */
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      h2 {
        color: hsl(60, 100%, 25%); /* Dark Gray */
        font-size: 28px;
        margin: 0;
        padding-bottom: 10px;
        text-align: center;
      }

      p {
        color: hsl(0, 0%, 0%); /* Gray */
        font-size: 16px;
        margin: 0;
        text-align: left;
      }

      .button-container {
        text-align: center;
        margin-top: 20px;
      }

      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: hsl(328, 100%, 59%); /* Blue */
        color: hsl(210, 60%, 98%); /* White */
        font-weight: bold;
        border-radius: 5px;
        text-decoration: none;
      }

      .button:hover {
        background-color: hsl(25, 100%, 50%); /* Darker Blue */
      }

      .footer {
        text-align: left;
        padding: 20px 5%;
        margin-top: 20px;
        font-size: 12px;
        color: hsl(0, 0%, 0%); /* Light Gray */
      }
    </style>
  </head>
  <body>
    <div class="header">
      <a href="#">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWtvKgAkMj_gzrRKUkaonxClNNp3evQwwdmPox9nDg&s"
          alt="Smart Parking System logo"
        />
      </a>
      <h1>Smart Parking System</h1>
    </div>
    <div class="content">
      <h2>
        Your Parking Experience Begins,<br />
        Welcome to Smart Parking System!
      </h2>
      <p>
        Dear ${userNames ? userNames.split(" ")[0] : "Valued Customer"},
        <br /><br />
        We're thrilled to welcome you to Smart Parking System, your solution to
        hassle-free parking. Your decision to join us marks the beginning of a
        journey where finding a parking spot is just a click away.
        <br /><br />Reserve your parking spot today and experience the
        convenience!
      </p><br />
    </div><br />
    <div class="footer">
      Thank you for choosing Smart Parking System to simplify your parking
      experience. We look forward to providing you with seamless parking
      solutions that enhance your daily commute. Explore the features and
      functionalities of our platform. If you have any questions or need
      assistance, feel free to reach out. We are here to make your parking
      experience as efficient and enjoyable as possible.<br /><br />

      Best regards,
    </div>
  </body>
</html>


`,
  };

  transporter.sendMail(message);
};
