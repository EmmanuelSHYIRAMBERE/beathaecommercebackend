import { Building, Floors, Parkings, User } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const getAllFloors = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const building = await Building.findById(id);

  if (!building) {
    return next(new errorHandler(`A building with ID: ${id} not found!`, 404));
  }

  const floors = await Floors.find({ buildingId: id });

  res.status(200).json({
    floors,
  });
});
