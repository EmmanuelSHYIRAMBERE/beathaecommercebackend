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
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetTokenExpirers: Date,
});

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetTokenExpirers = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

export const User = mongoose.model("User", userSchema);
