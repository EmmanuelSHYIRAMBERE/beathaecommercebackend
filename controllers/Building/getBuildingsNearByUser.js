import { Building } from "../../models";
import { catchAsyncError } from "../../utility";
import { changeBookingStatus } from "../Bookings";

function calculateDistance(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) {
    return null;
  }

  const radiusOfEarthInKM = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceInKM = radiusOfEarthInKM * c;

  return distanceInKM;
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

export const getBuildingsNearByUser = catchAsyncError(
  async (req, res, next) => {
    const userLatitude = req.body.latitude;
    const userLongitude = req.body.longitude;

    changeBookingStatus();

    const allBuildings = await Building.find({});

    const buildingsWithDistances = allBuildings.map((building) => {
      const distance = calculateDistance(
        userLatitude,
        userLongitude,
        building.Latitude,
        building.Longitude
      );
      return {
        ...building.toObject(),
        distance,
      };
    });

    const sortedBuildings = buildingsWithDistances.sort((a, b) => {
      if (a.distance === null && b.distance === null) {
        return 0; // Keep the original order if both have wrong coordinates
      } else if (a.distance === null) {
        return 1; // Put buildings with wrong coordinates at the end
      } else if (b.distance === null) {
        return -1; // Put buildings with wrong coordinates at the end
      } else {
        return a.distance - b.distance; // Sort by distance for valid buildings
      }
    });

    const totalBuilding = sortedBuildings.length;

    res.status(200).json({
      Buildings: totalBuilding,
      allBuildings: sortedBuildings,
    });
  }
);
