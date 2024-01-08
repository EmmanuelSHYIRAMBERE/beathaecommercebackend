import { Cars, Parkings, Reservations } from "../../models";
import { catchAsyncError, validateParkingAccessForDate } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const bookParkingSpot = catchAsyncError(async (req, res, next) => {
  const userID = req.user._id;

  const parkingID = req.params.id;

  const parking = await Parkings.findById(parkingID).lean();
  if (!parking) {
    return next(
      new errorHandler(`A parking slot: ${parking.Slot} not found`, 404)
    );
  }
  if (parking.status === true) {
    return next(
      new errorHandler(
        `A parking slot: ${parking.Slot} parking has been taken, try others.`,
        400
      )
    );
  }

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

  const reservedData = {
    _id: reserved._id,
    bookedDate: reserved.bookedDate,
    startHour: reserved.replyMessage,
    endHour: reserved.endHour,
    totalPrice: reserved.totalPrice,
    Status: reserved.Status,
    Duration: reserved.Duration,
    userID: reserved.userID,
    slotID: reserved.slotID,
    carID: reserved.carID,
    dateSent: reserved.dateSent,
  };

  res.status(201).json({
    message: `A parking slot ${parking.Slot} booked successfully`,
    reservedData,
  });
});
