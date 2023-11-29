import { Building } from "../../models";
import { User } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const addNewBuilding = catchAsyncError(async (req, res, next) => {
  const userID = req.body.managerId;
  const user = await User.findById(userID);

  if (!user) {
    return next(
      new errorHandler(`A user with ID: ${userID} is not found`, 404)
    );
  }

  user.role = "manager";

  if (user.buildingManaged && user.buildingAddress) {
    return next(
      new errorHandler(`A user with ID: ${userID} is already manager`, 404)
    );
  } else {
    user.buildingManaged = req.body.buildingName;
    user.buildingAddress = req.body.Address;
  }

  await user.save();

  const building = await Building.create(req.body);

  res.status(201).json({
    message: "The new building data was successfully created",
    buildingData: { building },
    managerData: { user },
  });
});
