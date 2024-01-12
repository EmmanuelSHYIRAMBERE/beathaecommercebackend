import { Parkings } from "../../models";
import { catchAsyncError } from "../../utility";

export const getAllSlots = catchAsyncError(async (req, res, next) => {
  const allSlots = await Parkings.find({});

  const totalSlotsNumber = allSlots.length;

  const totalRemainingSlots = (slot) => allSlots.filter(slot.status !== true);
  const totalReservedSlots = (slot) => allSlots.filter(slot.status !== false);

  const remainingSlots = totalRemainingSlots.length;
  const reservedSlots = totalReservedSlots.length;

  res.status(200).json({
    totalSlots: totalSlotsNumber,
    remainingSlots: remainingSlots,
    reservedSlots: reservedSlots,
  });
});
