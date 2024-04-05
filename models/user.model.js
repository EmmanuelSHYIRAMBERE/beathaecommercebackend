import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullNames: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    profilePicture: {
      type: String,
      required: false,
    },
    phoneNo: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      default: "user",
    },
    otp: {
      type: String,
      required: false,
    },
    otpExpiry: {
      type: Date,
    },
    passwordChangedAt: Date,
  },

  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
