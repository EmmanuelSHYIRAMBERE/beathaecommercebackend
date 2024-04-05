import crypto from "crypto";
import { catchAsyncError, comparePwd, getToken } from "../utility";
import { User } from "../models";
import errorHandler from "../utility/errorhandler.utility";

export const logIn = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });

  if (!req.body.username || !req.body.password) {
    return next(new errorHandler("Please provide username and password", 400));
  }

  if (!user) {
    return next(
      new errorHandler(
        `User with this username not found, please try again.`,
        404
      )
    );
  }

  let isPwdMatch = await comparePwd(req.body.password, user.password);

  if (!isPwdMatch) {
    return next(new errorHandler(`Incorrect password. Please try again.`, 401));
  }

  let token = getToken({ _id: user._id, email: user.email });

  res.status(200).json({
    message: "User logged in successfully!",
    access_token: token,
    user: {
      userId: user._id,
      fullNames: user.fullNames,
      email: user.email,
      username: user.username,
      phoneNo: user.phoneNo,
      location: user.location,
      role: user.role,
    },
  });
});

export const changePwd = catchAsyncError(async (req, res, next) => {
  const { existingPassword, newPassword } = req.body;

  const user = await User.findOne({ email: req.user.email });

  if (!user) {
    return next(new errorHandler("Please log in first!"));
  }

  let pwdCheck = await comparePwd(existingPassword, user.password);

  if (!pwdCheck) {
    return next(new errorHandler("Incorrect password. Please try again.", 401));
  }

  let hashedPwd = await hashPwd(newPassword);

  user.password = hashedPwd;

  user.save();

  res.status(200).json({
    message: "Password changed successfully!",
  });
});

export const generateOTP = (expiryMinutes = 5) => {
  const otp = crypto.randomInt(100000, 999999);
  const expiryTime = new Date();
  expiryTime.setMinutes(expiryTime.getMinutes() + expiryMinutes);

  return {
    code: otp.toString(),
    expiresAt: expiryTime,
  };
};

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

  const resetPasswordOTP = generateOTP().code;

  user.otp = resetPasswordOTP;
  user.otpExpiry = generateOTP().expiresAt;

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    message: "Password reset OTP sent to your email",
    OTP: resetPasswordOTP,
  });
});

export const resetPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new errorHandler.NotFoundError("User not found"));
  }

  const OTP = req.body.OTP;

  if (user.otp !== OTP) {
    return next(
      new errorHandler(`Dear user the otp entered  ${OTP} is not correct`, 401)
    );
  }

  const currentDateTime = new Date();
  if (currentDateTime > user.otpExpiry) {
    return next(
      new errorHandler(
        `The provided otp has been expired, please try again.`,
        401
      )
    );
  }

  let hashedPwd = await hashPwd(req.body.password);

  user.password = hashedPwd;
  user.otp = undefined;
  user.otpExpiry = undefined;
  user.passwordChangedAt = Date.now();

  await user.save();

  let token = getToken({ _id: user._id, email: user.email });

  res.status(200).json({
    message: "Success, password updated!",
    access_token: token,
  });
});
