import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullNames: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: false,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  buildingManaged: {
    type: String,
    default: null,
  },
  buildingAddress: {
    type: String,
    default: null,
  },
  otp: {
    type: String,
    required: false,
  },
  otpExpiry: {
    type: Date,
  },
  passwordChangedAt: Date,
});

export const User = mongoose.model("User", userSchema);
