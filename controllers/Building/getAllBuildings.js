import { Building, User } from "../../models";
import { catchAsyncError } from "../../utility";

export const getAllBuildings = catchAsyncError(async (req, res, next) => {
  const allBuildings = await Building.find({}).select({
    Floors: 0,
    availableSpots: 0,
    bookedSlots: 0,
  });

  const totalBuilding = allBuildings.length;

  res.status(200).json({
    Buildings: totalBuilding,
    allBuildings,
  });
});
