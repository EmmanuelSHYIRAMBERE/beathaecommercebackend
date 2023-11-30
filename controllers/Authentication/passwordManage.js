import { catchAsyncError, hashPwd } from "../../utility";
import { User } from "../../models";
import errorHandler from "../../utility/errorHandlerClass";

// Middleware to change user password
export const changePwd = catchAsyncError(async (req, res, next) => {
  // Extract user and password information from the request
  const user = req.user;
  const { newPassword, confirmPassword } = req.body;

  // Validate if new password and confirmation match
  if (newPassword !== confirmPassword) {
    return next(new errorHandler(`Passwords do not match!`, 400));
  }

  try {
    // Hash the new password
    const hashedPwd = await hashPwd(newPassword);

    // Update user's password in the database
    user.password = hashedPwd;
    await user.save();

    // Send success response
    res.status(200).json({
      message: "Password changed successfully!",
    });
  } catch (error) {
    // Handle any errors that occur during the password change process
    return next(
      new errorHandler(`Error changing password: ${error.message}`, 500)
    );
  }
});
