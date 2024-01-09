import { Building, Floors, Parkings, Reservations } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";
import { changeBookingStatus } from "./changeBookingStatus";

export const getRecentBookingOfUser = catchAsyncError(
  async (req, res, next) => {
    const userID = req.user._id;

    changeBookingStatus();

    const bookings = await Reservations.find({ userID }).sort({ dateSent: -1 });

    if (!bookings || bookings.length === 0) {
      return next(new errorHandler(`You do not have any reserved slot.`, 404));
    }

    res.status(200).json(bookings);
  }
);
