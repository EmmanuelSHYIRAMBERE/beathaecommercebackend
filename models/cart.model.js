import mongoose from "mongoose";

const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        count: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: false,
          min: 0,
        },
      },
    ],

    cartBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Cart = mongoose.model("Cart", cartSchema);
