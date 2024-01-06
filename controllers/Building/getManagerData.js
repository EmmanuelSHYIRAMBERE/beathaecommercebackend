import { Building } from "../../models/parkingBuilding.js";
import { User } from "../../models/userModel.js";
import { catchAsyncError } from "../../utility/catchSync.js";
import errorHandler from "../../utility/errorHandlerClass.js";

export const getManagerData = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({ _id: id });

  if (!user) {
    return next(new errorHandler(`There's no details for this user`, 404));
  }

  const building = await Building.findOne({ managerEmail: user.email });

  if (!building) {
    return next(new errorHandler(`There's no details for this user`, 404));
  }

  return res.status(201).json({
    status: "Success",
    user,
  });
});
