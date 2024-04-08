import { User } from "../models";
import { catchAsyncError, hashPwd } from "../utility";
import errorHandler from "../utility/errorhandler.utility";

export const signUp = catchAsyncError(async (req, res, next) => {
  const { email, username } = req.body;

  const user = await User.findOne({ email: email });

  if (user) {
    return next(
      new errorHandler(
        `user with the email: ${user.email} already exists, try others`,
        409
      )
    );
  }

  const userNameExists = await User.find({ username: username });

  if (userNameExists) {
    return next(
      new errorHandler(`username: ${username} already exists, try others`, 409)
    );
  }

  let hashedPwd = "";

  hashedPwd = await hashPwd(req.body.password);

  req.body.password = hashedPwd;

  let newUser = await User.create(req.body);

  res.status(201).json({
    message: "user registerd successfully.",
    data: {
      userId: newUser._id,
      Names: newUser.fullNames,
      Email: newUser.email,
      Username: newUser.username,
      phoneNo: newUser.phoneNo,
      location: newUser.location,
      status: newUser.status,
      role: newUser.role,
    },
  });
});

export const deleteUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete({ _id: id });

  if (!user) {
    return next(new errorHandler(`A  user with ID: ${id}, not found`, 404));
  }

  res.status(200).json({
    message: `A user with ID: ${id}, deleted successfully!`,
  });
});

export const getAllUser = catchAsyncError(async (req, res, next) => {
  const users = await User.find({});

  if (!users) {
    return next(new errorHandler(`Nothing found in database`, 404));
  }

  res.status(200).json(users);
});

export const getSingleUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({ _id: id });

  if (!user) {
    const admin = await Admin.findOne({ _id: id });

    if (!admin) {
      return next(new errorHandler(`A user with ID: ${id} not found`, 404));
    }

    res.status(200).json({ admin });
    return;
  }

  res.status(200).json({ user });
});

export const modifyUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  // Check in the User database
  const user = await User.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  // If not found in the User database, check in the Admin database
  if (!user) {
    return next(new errorHandler(`A user with ID: ${id} not found`, 404));
  }

  const modifiedUser = await User.findById({ email });

  // You might need to modify the response based on your data structure

  // You might need to modify the response based on your data structure
  res.status(200).json({
    message: `A user with ID: ${id}, modified successfully to:`,
    modifiedUser: modifiedUser,
  });
});
