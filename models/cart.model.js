import mongoose from "mongoose";

const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    productId: {
      type: String,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    priceperitem: {
      type: Number,
      required: false,
      min: 0,
    },
    totalPrice: {
      type: Number,
      required: false,
      min: 0,
    },

    cartBy: {
      type: String,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Cart = mongoose.model("Cart", cartSchema);
