import { Parkings } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const checkAvailableParkingsByUser = catchAsyncError(
  async (req, res, next) => {
    // const { id } = req.params;
    let id = req.params.id;
    console.log(
      "---------------------------------------------------------",
      id
    );

    const Parking = await Parkings.find({ floorID: id });

    if (!Parking) {
      return next(new errorHandler(`A floor with ID: ${id} not found!`, 404));
    }

    let availableSlots = {};

    if (Parking.status == false) {
      availableSlots = Parking;
      console.log("--------------------", availableSlots);
    }
    res.status(200).json({
      availableSlots,
    });
  }
);
