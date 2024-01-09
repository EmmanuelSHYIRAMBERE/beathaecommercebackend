import { User, Building } from "../../models";
import {
  catchAsyncError,
  generateRandomPassword,
  hashPwd,
  managerEmailMessage,
} from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const updateManagerData = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  let user = await User.findOne({ _id: id });

  if (!user) {
    return next(new errorHandler(`This user not found`, 404));
  }

  let building = await Building.findOne({ managerEmail: user.email });

  if (!building) {
    return next(
      new errorHandler(`This user is not assigned to any building.`, 404)
    );
  }

  const { email, fullNames, phoneNo, status } = req.body;

  user.email = email || user.email;
  user.fullNames = fullNames || user.fullNames;
  user.phoneNo = phoneNo || user.phoneNo;
  user.status = status || user.status;
  user.buildingManaged = building.buildingName;
  user.buildingAddress = building.Street;

  if (req.body.email && req.body.email !== building.managerEmail) {
    const defaultPassword = generateRandomPassword(12);
    const hashedPassword = await hashPwd(defaultPassword);

    req.body.managerPassword = hashedPassword;
    user.password = req.body.managerPassword;

    await user.save();

    building.managerEmail = user.email;
    await building.save();

    managerEmailMessage(user.email, defaultPassword);
  }

  await user.save();

  const filteredUser = {
    _id: user._id,
    email: user.email,
    fullNames: user.fullNames,
    phoneNo: user.phoneNo,
    role: user.role,
  };

  res.status(200).json({
    message: "User updated successfully",
    user: filteredUser,
  });
});
