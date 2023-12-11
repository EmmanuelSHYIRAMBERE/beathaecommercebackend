import { Parkings } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const checkAvailableParkingsByUser = catchAsyncError(
  async (req, res, next) => {
    let id = req.params.id;

    const parkingList = await Parkings.find({ floorID: id });

    if (!parkingList || parkingList.length === 0) {
      return next(
        new errorHandler(`No parking found for floor ID: ${id}`, 404)
      );
    }

    let availableSlots = parkingList.filter(
      (parking) => parking.status === false
    );

    res.status(200).json({
      availableSlots,
    });
  }
);
