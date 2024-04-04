import mongoose from "mongoose";

//Product Schema
const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    productImage: [
      {
        type: String,
        required: true,
      },
    ],
    stock_quantity: {
      type: Number,
      default: 0,
    },
    total_price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);
