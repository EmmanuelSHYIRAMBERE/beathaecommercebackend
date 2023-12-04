import { Building } from "../../models/parkingBuilding.js";
import { Parkings } from "../../models/parkingModel.js";
import { catchAsyncError } from "../../utility/catchSync.js";

export const addNewParking = catchAsyncError(async (req, res, next) => {
  const managerID = req.user._id;

  const building = await Building.find({ managerId: managerID });

  if (!building) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid manager ID",
    });
  }

  req.body.Address = building.Address;
  req.body.building = building.buildingName;

  const newParkingSlot = await Parkings.create(req.body);

  if (
    typeof building.availableSpots === "number" &&
    !isNaN(building.availableSpots)
  ) {
    building.availableSpots += 1;

    await building.save();
  } else {
    console.error("Invalid availableSpots value:", building.availableSpots);
  }

  return res.status(201).json({
    status: "A parking slot added successfully",
    data: { newParkingSlot },
  });
});
