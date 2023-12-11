import { Floors } from "../../models/floorModel.js";
import { Building } from "../../models/parkingBuilding.js";
import { Parkings } from "../../models/parkingModel.js";
import { catchAsyncError } from "../../utility/catchSync.js";
import errorHandler from "../../utility/errorHandlerClass.js";

export const addNewParking = catchAsyncError(async (req, res, next) => {
  const managerEmail = req.user.email;

  const building = await Building.findOne({ managerEmail: managerEmail });

  if (!building) {
    return res.status(400).json({
      message: "You are not authorised!",
    });
  }

  const { id } = req.params;

  const floor = await Floors.findById(id);

  if (!floor) {
    return next(new errorHandler(`A floor with ID: ${id} not found!`, 404));
  }

  req.body.floorID = floor._id;

  const slot = await Parkings.create(req.body);

  building.availableSpots = parseInt(building.availableSpots) + 1;

  await building.save();

  return res.status(201).json({
    status: "A new slot added successfully",
    slot,
  });
});
