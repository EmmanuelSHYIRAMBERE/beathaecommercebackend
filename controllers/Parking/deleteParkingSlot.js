import { Building, Parkings } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const deleteParkingSlot = catchAsyncError(async (req, res, next) => {
  const managerEmail = req.user.email;

  const building = await Building.findOne({ managerEmail: managerEmail });

  if (!building) {
    return res.status(400).json({
      message: "You are not authorised!",
    });
  }

  const { id } = req.params;

  const parkingSlot = await Parkings.findByIdAndDelete({ _id: id });

  if (!parkingSlot) {
    return next(new errorHandler(`A slot with ID: ${id}, not found`, 404));
  }

  building.availableSpots = parseInt(building.availableSpots) - 1;

  await building.save();

  res.status(200).json({
    message: `A parking slot with ID: ${id}, deleted successfully!`,
  });
});
