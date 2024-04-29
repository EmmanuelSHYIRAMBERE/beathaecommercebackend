import nodemailer from "nodemailer";

export const paymentRequestConfirmationEmail = (
  userEmail,
  userNames,
  paymentDetails
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.Email,
      pass: process.env.Password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const message = {
    from: process.env.Email,
    to: userEmail,
    subject: "Payment Request Confirmation - Beatha E-commerce",
    html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Payment Request Confirmation</title>
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

                .payment-details {
                    margin-bottom: 20px;
                }

                .payment-details h2 {
                    font-size: 18px;
                    color: #333333;
                    margin-bottom: 10px;
                }

                .payment-details p {
                    font-size: 16px;
                    color: #555555;
                    margin-bottom: 5px;
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
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Payment Request Confirmation - Beatha E-commerce</h1>
                    <p>Dear ${
                      userNames ? userNames.split(" ")[0] : "Valued Customer"
                    },</p>
                </div>
                <div class="content">
                    <p>Your payment request for the order has been successfully received.</p>
                    <div class="payment-details">
                        <h2>Payment Request Details:</h2>
                        <p><strong>Number of Items:</strong> ${
                          paymentDetails.items
                        }</p>
                        <p><strong>Payable Amount:</strong> ${
                          paymentDetails.amount
                        }</p>
                        <p><strong>Currency:</strong> ${
                          paymentDetails.currency
                        }</p>
                        <p><strong>Payment Method:</strong> ${
                          paymentDetails.payment_method
                        }</p>
                    </div>
                    <p>Please make sure to validate your order by paying as soon as possible.</p>
                    <p>Thank you for shopping with Beatha E-commerce!</p>
                </div>
            </div>
        </body>
        </html>
        `,
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
};
