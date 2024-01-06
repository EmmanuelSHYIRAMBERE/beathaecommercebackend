import { Parkings } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const sytemStatistics = catchAsyncError(async (req, res, next) => {
  let totalAvailableSlots = 0;
  let totalReservedSlots = 0;

  const slots = await Parkings.find();

  if (!slots || slots.length === 0) {
    return next(new errorHandler(`There's no slots registered!`, 401));
  }

  totalAvailableSlots += slots.filter((slot) => !slot.status).length;
  totalReservedSlots += slots.filter((slot) => slot.status).length;

  res.status(200).json({
    message: `Success, the following are the current statistics of the system.`,
    totalAvailableSlots: totalAvailableSlots,
    totalReservedSlots: totalReservedSlots,
  });
});
