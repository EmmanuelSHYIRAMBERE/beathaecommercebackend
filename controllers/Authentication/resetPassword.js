import { promisify } from "util";
import { User } from "../../models";
import { catchAsyncError, getToken } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

import crypto from "crypto";
import { token } from "morgan";
import { resetPasswordEmail } from "../../middleware/resetPasswordEmail";

export const decodeToken = catchAsyncError(async (req, res, next) => {
  //2)Verification token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );

  //3)Check if user still exists
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new errorHandler(
        `The user belonging to this token does no longer exist`,
        401
      )
    );
  }

  //4)Check if user changed password after the token issued
  if (currentUser.changePasswordAfter(decoded.iat)) {
    return next(
      new errorHandler(
        `The user recently changed password! Please log in again.`,
        401
      )
    );
  }

  //Grant access to protected route
  req.user = currentUser;
  next();
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    //roles ['admin', 'lead-guide']. role='user'
    if ((!roles, includes(req.user.role))) {
      new errorHandler(`You don't have permission to perform this action`, 403);
    }
    next();
  };
};

export const forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(
      new errorHandler(`We could not find the user with email: ${email}`, 404)
    );
  }

  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/parking/password/resetpassword/${resetToken}`;

  const message = `We have received a password reset request. Please use the link below to reset your password\n\n${resetUrl}\n\nThis reset password link will be valid only for 10 minutes. `;

  try {
    resetPasswordEmail({
      email: user.email,
      subject: "Password change request received",
      message: message,
    });

    res.status(200).json({
      status: "success",
      message: "Password reset link sent to the user email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpirers = undefined;

    await user.save({ validateBeforeSave: false });

    return next(
      new errorHandler(
        "There was an error sending the email, Try again later!"
      ),
      500
    );
  }
});

export const resetPassword = catchAsyncError(async (req, res, next) => {
  // Encrypt password reset token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  //1) Get userbased on the token

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpirers: {
      $gt: Date.now(),
    },
  });

  //2) If token has not expired, and there is user, set the new password

  if (!user) {
    return next(new errorHandler("Token is invalid or has expired", 401));
  }

  if (!(req.body.password === req.body.passwordConfirm)) {
    return next(
      new errorHandler("Password and confirm password does not match!", 401)
    );
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpirers = undefined;
  user.passwordChangedAt = Date.now();

  await user.save();

  //3)LOGIN the user automatically, send JWT token
  let token = getToken({ _id: user._id, email: user.email });

  res.status(200).json({
    message: "Success!",
    access_token: token,
  });
});
