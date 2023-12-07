import { Parkings } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const checkAvailableParkingsByUser = catchAsyncError(
  async (req, res, next) => {
    const parkings = await Parkings.find();

    const formattedParkings = parkings
      .filter((park) => park.status === "available")
      .map((park) => ({
        _id: park._id,
        Name: park.parkingName,
        Amount: park.Amount,
        Building: park.building,
        Location: park.Address,
        latestTime: park.latestTime,
        status: park.status,
      }));

    res.status(200).json({
      data: formattedParkings,
    });
  }
);
