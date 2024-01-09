import { Parkings, Reservations } from "../../models";
import { changeBookingStatus } from "./changeBookingStatus";

export const checkSlotAvailability = async (
  id,
  bookedDate,
  endHour,
  startHour
) => {
  changeBookingStatus();

  const userEndTime = Date.parse(bookedDate + "T" + endHour);
  const userStartTime = Date.parse(bookedDate + "T" + startHour);

  const reservedSlots = await Reservations.find({ slotID: id });

  if (reservedSlots) {
    for (const reserved of reservedSlots) {
      const endBookedTime = Date.parse(
        reserved.bookedDate + "T" + reserved.endHour
      );
      const startBookedTime = Date.parse(
        reserved.bookedDate + "T" + reserved.startHour
      );
      const now = Date.now();

      if (userStartTime > endBookedTime || userStartTime < startBookedTime) {
      }
      //   if (userEndTime > endBookedTime || userEndTime < startBookedTime) {
      //   }
    }
  }

  if (reserved) {
  }
};
