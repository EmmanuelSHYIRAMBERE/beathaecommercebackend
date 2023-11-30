import { catchAsyncError, comparePwd, hashPwd } from "../../utility";
import { Admin, User } from "../../models";
import errorHandler from "../../utility/errorHandlerClass";

export const changePwd = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  const { newPassword, confirmPassword } = req.body;

  console.log("====================================");
  console.log(user, "***", newPassword, "uyuy", confirmPassword);
  console.log("====================================");

  if (newPassword !== confirmPassword) {
    return next(new errorHandler(`Passwords do not match!`, 400));
  }

  try {
    let hashedPwd = await hashPwd(newPassword);
    user.password = hashedPwd;

    await user.save();

    res.status(200).json({
      message: "Password changed successfully!",
    });
  } catch (error) {
    return next(new errorHandler("Failed to change password, try again!", 500));
  }
});
