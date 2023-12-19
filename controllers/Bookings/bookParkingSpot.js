import { Cars, Parkings, Reservations } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export function validateParkingAccessForDate(userDate, startHour, endHour) {
  const accessDate = Date.parse(userDate + "T" + startHour);
  const endDate = Date.parse(userDate + "T" + endHour);

  const currentTime = Date.now();

  if (
    isNaN(accessDate) ||
    isNaN(endDate) ||
    currentTime >= accessDate ||
    accessDate > endDate
  ) {
    return false;
  }
  return true;
}

export const bookParkingSpot = catchAsyncError(async (req, res, next) => {
  const userID = req.user._id;

  const parkingID = req.params.id;

  const parking = await Parkings.findById(parkingID).lean();
  if (!parking) {
    return next(
      new errorHandler(`A parking slot with ID: ${parkingID} not found`, 404)
    );
  }
  console.log(parking);

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

  if (!validateParkingAccessForDate(bookedDate, startHour, endHour)) {
    return next(new errorHandler(`Time entered not valid!`, 400));
  }

  const reserved = await Reservations.create(req.body);

  res.status(201).json({
    message: `A parking slot with ID: ${parkingID} booked successfully`,
    reservationData: { reserved },
    Slot: { parking },
    Car: { car },
  });
});
