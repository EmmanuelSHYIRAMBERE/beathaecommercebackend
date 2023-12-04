import { use } from "passport";
import { Parkings, User } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

const calculateTimeAgo = (timebooked) => {
  const current_time = new Date();
  const time_booked = new Date(timebooked);
  const time_diff = current_time - time_booked;
  const seconds = time_diff / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;

  if (seconds < 60) {
    return `${Math.floor(seconds)} seconds ago`;
  } else if (minutes < 60) {
    return `${Math.floor(minutes)} minutes ago`;
  } else if (hours < 24) {
    return `${Math.floor(hours)} hours ago`;
  } else {
    return `${Math.floor(days)} days ago`;
  }
};

export const getTotalParking = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;

  const user = await User.findById(userId);

  console.log(user);

  if (!user) {
    return next(new errorHandler(`User not found!`, 404));
  }
  const availableParkingSpots = await Parkings.find({
    building: user.buildingManaged,
  });

  if (!availableParkingSpots || availableParkingSpots.length === 0) {
    return next(
      new errorHandler(`No parking spots found for the building!`, 404)
    );
  }

  const formattedParkingSpots = availableParkingSpots.map((parkingSpot) => {
    const formattedSpot = {
      amount: parkingSpot.Amount,
      status: parkingSpot.status,
      building: parkingSpot.building, // Include the building field
    };

    if (parkingSpot.status === "reserved" && parkingSpot.timebooked) {
      formattedSpot.reservationTimeAgo = calculateTimeAgo(
        parkingSpot.timebooked
      );
    }

    return formattedSpot;
  });

  const parkingSpotsByBuilding = formattedParkingSpots.reduce(
    (acc, parkingSpot) => {
      const buildingName = parkingSpot.building;

      if (!acc[buildingName]) {
        acc[buildingName] = [];
      }

      acc[buildingName].push(parkingSpot);
      return acc;
    },
    {}
  );

  const buildingTotals = Object.entries(parkingSpotsByBuilding).map(
    ([buildingName, buildingSpots]) => {
      const totalSpots = buildingSpots.length;
      const totalReserved = buildingSpots.filter(
        (parkingSpot) => parkingSpot.status === "reserved"
      ).length;
      const totalAvailable = buildingSpots.filter(
        (parkingSpot) => parkingSpot.status === "available"
      ).length;

      return {
        buildingName,
        totalSpots,
        totalReserved,
        totalAvailable,
        buildingSpots,
      };
    }
  );

  const totalBuilding = buildingTotals.length;
  const totalSpots = formattedParkingSpots.length;
  const totalReserved = formattedParkingSpots.filter(
    (parkingSpot) => parkingSpot.status === "reserved"
  ).length;
  const totalAvailable = formattedParkingSpots.filter(
    (parkingSpot) => parkingSpot.status === "available"
  ).length;

  res.status(200).json({
    data: {
      totalBuilding: totalBuilding,
      allParkingParkingSpots: totalSpots,
      allReservedParkingSpots: totalReserved,
      availableParking: totalAvailable,
    },
    buildingTotals,
  });
});
