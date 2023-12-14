import { Building, Floors, Parkings, User } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const getAllFloors = catchAsyncError(async (req, res, next) => {
  const manager = req.user.email;

  const building = await Building.findOne({ managerEmail: manager });

  console.log(building);

  if (!building) {
    return next(new errorHandler(`No floors found!`, 404));
  }

  const floors = await Floors.find({ buildingId: building._id });

  res.status(200).json({
    floors,
  });
});
