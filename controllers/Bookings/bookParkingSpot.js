import { Cars, Parkings, Reservations } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export function validateParkingAccessForDate(date, startHour, endHour) {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();

  const userDate = new Date(date);

  const isBefore = userDate < currentDate;
  const isSame = userDate.getTime() === currentDate.getTime();
  const isAfter = userDate > currentDate;

  const isWithinRange =
    (isSame && currentHour >= startHour && currentHour < endHour) ||
    (isAfter && isBefore);

  return isWithinRange;
}

export const bookParkingSpot = catchAsyncError(async (req, res, next) => {
  const userID = req.user._id;

  const parkingID = req.params.id;

  const parking = await Parkings.findById(parkingID);
  if (!parking) {
    return next(
      new errorHandler(`A parking slot with ID: ${parkingID} not found`, 404)
    );
  }

  console.log(parkingID);

  const carID = req.body.carID;
  const car = await Cars.findById({ _id: carID });
  if (!car) {
    return next(new errorHandler(`A car with ID: ${carID} not found`, 404));
  }
  const bookedDate = req.body.bookedDate;
  const startHour = req.body.startHour;
  const endHour = req.body.endHour;
  req.body.slotID = parkingID;
  req.body.userID = userID;

  // if (startHour < 0 || startHour > 24 || endHour < 0 || endHour > 24) {
  //   return next(new errorHandler(`Invalid time!`, 400));
  // } else if (startHour > endHour) {
  //   return next(
  //     new errorHandler(`Starting time must be less than Ending time!`, 400)
  //   );
  // } else if (!(bookedDate < Date.now)) {
  //   return next(new errorHandler(`Date entered no longer exists!`, 400));
  // }

  log;

  if (!validateParkingAccessForDate(bookedDate, startHour, endHour)) {
    return next(new errorHandler(`Invalid time entered!`, 401));
  }

  const reserved = await Reservations.create(req.body);

  res.status(201).json({
    message: `A parking slot with ID: ${parkingID} booked successfully`,
    reservationData: { reserved },
    Slot: { parking },
    Car: { car },
  });
});
