import cron from "node-cron";

import { Parkings, Reservations } from "../../models";
import { catchAsyncError } from "../../utility";

export const changeBookingStatus = catchAsyncError(async (req, res, next) => {
  const bookings = await Reservations.find({});

  if (bookings) {
    for (const booking of bookings) {
      const endBookedTime = Date.parse(
        booking.bookedDate + "T" + booking.endHour
      );
      const startBookedTime = Date.parse(
        booking.bookedDate + "T" + booking.startHour
      );
      const now = Date.now();

      const parkingSlot = await Parkings.findOne({ _id: booking.slotID });

      if (now >= startBookedTime && now < endBookedTime) {
        // if (booking.Status === "pending") {
        //   booking.Status = "Cancelled";
        //   await booking.save();

        //   if (parkingSlot) {
        //     parkingSlot.status = false;
        //     await parkingSlot.save();
        //   }
        // }
        booking.Status = "Ongoing";
        await booking.save();

        if (parkingSlot) {
          parkingSlot.status = true;
          await parkingSlot.save();
        }
      } else if (now >= endBookedTime) {
        // if (booking.Status !== "Ongoing") {
        //   booking.Status = "Cancelled";
        //   await booking.save();

        //   if (parkingSlot) {
        //     parkingSlot.status = false;
        //     await parkingSlot.save();
        //   }
        // }
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
