import nodemailer from "nodemailer";

export const registerEmail = (userEmail, userNames) => {
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
    subject: "Welcome to Beatha E-commerce! Your Shopping Awaits",

    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Beatha E-commerce!</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f9f9f9;
      }

      .container {
        max-width: 600px;
        margin: 50px auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }

      .header {
        text-align: center;
        margin-bottom: 30px;
      }

      .header h1 {
        font-size: 24px;
        margin-bottom: 10px;
        color: #333333;
      }

      .header p {
        font-size: 16px;
        color: #555555;
        margin-bottom: 20px;
      }

      .content {
        padding: 20px;
        background-color: #f0f0f0;
        border-radius: 6px;
        margin-bottom: 30px;
      }

      .content p {
        font-size: 16px;
        color: #333333;
        margin-bottom: 15px;
      }

      .benefits ul {
        list-style-type: disc;
        margin-left: 20px;
        color: #333333;
      }

      .cta {
        text-align: center;
      }

      .cta a {
        display: inline-block;
        padding: 12px 24px;
        background-color: #007bff;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
        transition: background-color 0.3s ease;
      }

      .cta a:hover {
        background-color: #0056b3;
      }

      .important-link {
        color: #007bff;
        text-decoration: underline;
      }

      .important-link:hover {
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Welcome to Beatha E-commerce, ${
          userNames ? userNames.split(" ")[0] : "Valued Customer"
        }!</h1>
        <p>Thank you for registering with us.</p>
      </div>
      <div class="content">
        <p>
          You're now part of Beatha E-commerce, where shopping becomes an
          experience.
        </p>
        <p>Here are some perks you can enjoy:</p>
        <ul class="benefits">
          <li>Exclusive discounts and promotions</li>
          <li>Faster checkout process</li>
          <li>Order tracking and history</li>
          <li>Personalized product recommendations</li>
        </ul>
        <p>Get ready to discover exciting products and amazing deals!</p>
      </div>
    </div>
  </body>
</html>

`,
  };

  transporter.sendMail(message);
};
