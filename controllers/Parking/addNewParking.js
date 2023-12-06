import { Building } from "../../models/parkingBuilding.js";
import { Parkings } from "../../models/parkingModel.js";
import { catchAsyncError } from "../../utility/catchSync.js";

export const addNewParking = catchAsyncError(async (req, res, next) => {
  const managerEmail = req.user.email;

  const building = await Building.findOne({ managerEmail: managerEmail });

  if (!building) {
    return res.status(400).json({
      message: "You are not authorised!",
    });
  }

  req.body.Address = building.Address;
  req.body.building = building.buildingName;

  const newParkingSlot = await Parkings.create(req.body);

  building.availableSpots = parseInt(building.availableSpots) + 1;

  await building.save();

  return res.status(201).json({
    status: "A parking slot added successfully",
    data: { newParkingSlot },
  });
});
