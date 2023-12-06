import { Building, User } from "../../models";
import { catchAsyncError } from "../../utility";

export const getAllBuildings = catchAsyncError(async (req, res, next) => {
  const allBuildings = await Building.find({});

  const buildingDetails = await Promise.all(
    allBuildings.map(async (building) => {
      const user = await User.findById(building.managerId);

      return {
        buildingID: building._id,
        buildingName: building.buildingName,
        Location: building.Address,
        buildingManager: building.managerEmail,
      };
    })
  );

  const totalBuilding = buildingDetails.length;

  res.status(200).json({
    totalBuilding,
    Building: buildingDetails,
  });
});
