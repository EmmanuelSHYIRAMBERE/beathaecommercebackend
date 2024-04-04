import mongoose from "mongoose";

const billingSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    town: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    postcode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Billing = mongoose.model("Billing", billingSchema);
