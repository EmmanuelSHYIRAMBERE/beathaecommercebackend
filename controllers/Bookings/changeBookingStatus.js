import cron from "node-cron";

import { Parkings, Reservations } from "../../models";
import { catchAsyncError } from "../../utility";

export const changeBookingStatus = catchAsyncError(async (req, res, next) => {
  const bookings = await Reservations.find({});

  if (bookings) {
    for (const booking of bookings) {
      const bookedTime = Date.parse(booking.bookedDate + "T" + booking.endHour);
      const now = Date.now();

      const parkingSlot = await Parkings.findOne({ _id: booking.slotID });

      if (now >= bookedTime) {
        booking.Status = "Completed";
        await booking.save();

        if (parkingSlot) {
          parkingSlot.status = false;
          await parkingSlot.save();
        }
      }
    }
  }
});

cron.schedule("* * * * * *", function () {
  changeBookingStatus();
});
