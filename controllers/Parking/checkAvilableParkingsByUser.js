import { Building, Floors, Parkings } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const checkAvailableParkingsByUser = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;

    const floors = await Floors.find({ buildingId: id });

    if (!floors || floors.length === 0) {
      return next(new errorHandler(`No floors found!`, 401));
    }

    const totalFloors = floors.length;

    const slots = await Promise.all(
      floors.map(async (floor) => {
        const floorSlots = await Parkings.find({ floorID: floor._id });
        return { floorName: floor.Name, slots: floorSlots };
      })
    );

    if (!slots || slots.length === 0) {
      return next(new errorHandler(`No slots found!`, 401));
    }

    res.status(200).json({
      Floors: totalFloors,
      slots,
    });
  }
);
