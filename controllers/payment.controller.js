import Stripe from "stripe";
import dotenv from "dotenv";
import { catchAsyncError } from "../utility/catchSync";
import errorHandler from "../utility/errorhandler.utility";
import { User } from "../models";
import { Cart } from "../models"; // Import the Cart model

dotenv.config();

const stripe = new Stripe(process.env.stripeSecret);

export const makepayment = catchAsyncError(async (req, res, next) => {
  const email = req.user.email;

  const user = await User.findOne({ email: email });

  if (!user) {
    return next(new errorHandler(`You must log in`, 409));
  }

  const cartItems = await Cart.find({ cartBy: user._id }).populate("productId");

  if (cartItems.length === 0 || !cartItems) {
    return next(new errorHandler(`Add product to your cart`, 400));
  }

  let totalAmount = 0;
  let itemCount = 0;
  cartItems.forEach((item) => {
    totalAmount += item.totalPrice;
    itemCount++;
  });

  const customer = await stripe.customers.create({
    email: email,
    name: user.fullNames,
  });

  const { card_Name, card_ExpYear, card_ExpMonth, card_CVC, card_Number } =
    req.body;

  try {
    const card_token = await stripe.tokens.create({
      card: {
        name: card_Name,
        exp_year: card_ExpYear,
        exp_month: card_ExpMonth,
        cvc: card_CVC,
        number: card_Number, // Test card number 4242424242424242
      },
    });

    // Use the test token to add a card to the customer
    const card = await stripe.customers.createSource(customer.id, {
      source: card_token.id,
    });

    const paymentMade = await stripe.charges.create({
      receipt_email: email,
      amount: parseInt(Math.round(totalAmount)),
      currency: "RWF",
      card: card.id,
      customer: customer.id,
    });

    user.customer_id = customer.id;
    user.card_id = card.id;
    user.receipt_id = paymentMade.id;
    user.role = "customer";

    await user.save();

    const paymentData = {
      success: true,
      itemsPaid: itemCount,
      paymentMade: {
        id: paymentMade.id,
        amount: paymentMade.amount,
        currency: paymentMade.currency,
        payment_method: paymentMade.payment_method_details.type,
        receipt_email: paymentMade.receipt_email,
        receipt_url: paymentMade.receipt_url,
        status: paymentMade.status,
      },
      user: {
        _id: user._id,
        email: user.email,
        fullNames: user.fullNames,
        phoneNo: user.phoneNo,
        location: user.location,
        role: user.role,
      },
    };

    res.status(201).json(paymentData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: error.message });
  }
});
