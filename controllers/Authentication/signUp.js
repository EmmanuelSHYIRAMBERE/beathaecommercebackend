import { comparePwd, generateRandomPassword, hashPwd } from "../../utility";
import { User } from "../../models";
import { managerEmailMessage, sendEmail } from "../../middleware";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const signUp = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    return next(
      new errorHandler(
        `user with the email: ${user.email} already exists, try others`,
        409
      )
    );
  }
  let hashedPwd = "";
  let defaultPassword = "";

  if (!req.body.password) {
    defaultPassword = generateRandomPassword(12);
    hashedPwd = await hashPwd(defaultPassword);

    managerEmailMessage(req.body.email, defaultPassword);
  } else {
    hashedPwd = await hashPwd(req.body.password);
    sendEmail(req.body.email, req.body.fullNames);
  }

  req.body.password = hashedPwd;

  let newUser = await User.create(req.body);

  let managerPassword = await comparePwd(defaultPassword, newUser.password);

  if (managerPassword) {
    newUser.status = "inactive";
    newUser.role = "manager";

    await newUser.save();
  }

  if (newUser.password) {
  }

  res.status(201).json({
    message: "user registerd successfully.",
    data: {
      userId: newUser._id,
      Names: newUser.fullNames,
      Email: newUser.email,
      phoneNo: newUser.phoneNo,
      location: newUser.location,
      status: newUser.status,
      role: newUser.role,
    },
  });
});
