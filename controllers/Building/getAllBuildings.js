import { Building, User } from "../../models";
import { catchAsyncError } from "../../utility";

export const getAllBuildings = catchAsyncError(async (req, res, next) => {
  const allBuildings = await Building.find({});

  const buildingDetails = await Promise.all(
    allBuildings.map(async (building) => {
      const user = await User.findById(building.managerId);

      return {
        buildingName: building.buildingName,
        Address: building.Address,
        manager: user.fullNames ? user.fullNames : null,
      };
    })
  );

  const totalBuilding = buildingDetails.length;

  res.status(200).json({
    totalBuilding,
    Building: buildingDetails,
  });
});

// import { Building } from "../../models";
// import { catchAsyncError } from "../../utility";

// export const getAllBuildings = catchAsyncError(async (req, res, next) => {
//   const allBuildings = await Building.find({});

//   const buildingTotals = allBuildings.map((building) => {
//     const totalSpots = building.availableSpots || 0;
//     const totalReserved = building.bookedSlots || 0;
//     const totalAvailable = totalSpots - totalReserved;

//     return {
//       buildingName: building.buildingName,
//       totalSpots,
//       totalReserved,
//       totalAvailable,
//       building,
//     };
//   });

//   const totalBuilding = buildingTotals.length;
//   const totalSpots = buildingTotals.reduce(
//     (acc, building) => acc + building.totalSpots,
//     0
//   );
//   const totalReserved = buildingTotals.reduce(
//     (acc, building) => acc + building.totalReserved,
//     0
//   );
//   const totalAvailable = buildingTotals.reduce(
//     (acc, building) => acc + building.totalAvailable,
//     0
//   );

//   res.status(200).json({
//     data: {
//       totalBuilding,
//       totalParkings: totalSpots,
//       Reserved: totalReserved,
//       Available: totalAvailable,
//     },
//     Building: buildingTotals,
//   });
// });
