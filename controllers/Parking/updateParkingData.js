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

  const parking = await Parkings.findById(id);

  if (
    !(
      parking.building === buildingData.buildingName &&
      parking.Address === buildingData.Address
    )
  ) {
    return next(new errorHandler("You are not authorised!"));
  }

  console.log(
    "parking.building",
    parking.building,
    "buildingData.buildingName",
    buildingData.buildingName
  );

  const parkingSlot = await Parkings.findByIdAndUpdate({ _id: id }, req.body);

  if (!parkingSlot) {
    return next(
      new errorHandler(`A parking slot with ID: ${id}, not found`, 404)
    );
  }

  const updatedParking = await Parkings.findById(id);
  res.status(200).json({
    message: `A parking slot with ID: ${id}, updated successfully to;`,
    updatedParking,
  });
});
