import { Building, Parkings } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const updateParking = catchAsyncError(async (req, res, next) => {
  const managerEmail = req.user.email;

  const buildingData = await Building.findOne({ managerEmail: managerEmail });

  if (!buildingData) {
    return res.status(400).json({
      message: "You are not authorised!",
    });
  }

  const { id } = req.params;

  const parkingSlot = await Parkings.findByIdAndUpdate({ _id: id }, req.body);

  if (!parkingSlot) {
    return next(new errorHandler(`A slot with ID: ${id}, not found`, 404));
  }

  const updatedParking = await Parkings.findById(id);
  res.status(200).json({
    message: `A slot with ID: ${id}, updated successfully`,
    updatedParking,
  });
});
