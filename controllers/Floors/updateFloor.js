import { Building, Floors, Parkings } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const updateFloor = catchAsyncError(async (req, res, next) => {
  const managerEmail = req.user.email;

  const buildingData = await Building.findOne({ managerEmail: managerEmail });

  if (!buildingData) {
    return res.status(400).json({
      message: "You are not authorised!",
    });
  }

  const { id } = req.params;

  const floor = await Floors.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  if (!floor) {
    return next(new errorHandler(`A floor with ID: ${id}, not found`, 404));
  }

  const updatedFloor = await Floors.findById(id);
  res.status(200).json({
    message: `A floor with ID: ${id}, updated successfully`,
    updatedFloor,
  });
});
