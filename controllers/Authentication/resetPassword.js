import { User } from "../../models";
import { catchAsyncError, getToken } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";
import bcrypt from "bcrypt";

import crypto from "crypto";
import { resetPasswordEmail } from "../../middleware/resetPasswordEmail";

// Import statements remain the same

export const forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(
      new errorHandler(
        `We could not find the user with email: ${req.body.email}`,
        404
      )
    );
  }

  const resetPasswordOTP = user.createOTPToken();

  user.otp = resetPasswordOTP;
  user.otpExpiry = Date.now() + 10 * 60 * 1000;

  await user.save({ validateBeforeSave: false });

  const message = `We have received a password reset request. Please use the OTP below to reset your password\n\n${resetPasswordOTP}\n\nThis reset password OTP will be valid only for 10 minutes. `;

  // resetPasswordEmail({
  //   email: user.email,
  //   subject: "Password change request received",
  //   message: message,
  // });

  res.status(200).json({
    status: "success",
    message: "Password reset OTP sent to the user email",
  });
});

export const resetPassword = catchAsyncError(async (req, res, next) => {
  const hashedToken = bcrypt.hashSync(req.params.token, 10);

  const user = await User.findOne({
    otp: bcrypt.hashSync(req.params.token, 10),
    otpExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return next(new errorHandler("Token is invalid or has expired", 401));
  }

  if (!(req.body.password === req.body.passwordConfirm)) {
    return next(
      new errorHandler("Password and confirm password do not match!", 401)
    );
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.otp = undefined;
  user.otpExpiry = undefined;
  user.passwordChangedAt = Date.now();

  await user.save();

  let token = getToken({ _id: user._id, email: user.email });

  res.status(200).json({
    message: "Success!",
    access_token: token,
  });
});
