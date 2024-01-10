import { Cars, Notification, Parkings, Reservations } from "../../models";
import { catchAsyncError, validateParkingAccessForDate } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";
import { changeBookingStatus } from "./changeBookingStatus";
import { checkSlotAvailability } from "./checkSlotAvailability";

export const bookParkingSpot = catchAsyncError(async (req, res, next) => {
  const userID = req.user._id;

  const parkingID = req.params.id;

  const parking = await Parkings.findById(parkingID).lean();
  if (!parking) {
    return next(
      new errorHandler(`A parking slot: ${parking.Slot} not found`, 404)
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
  req.body.floorID = parking.floorID;
  req.body.buildingId = parking.buildingId;
  req.body.userID = userID;

  console.log(parking.buildingId, parking.floorID);

  if (!validateParkingAccessForDate(bookedDate, startHour, endHour)) {
    return next(new errorHandler(`Time entered not valid!`, 400));
  }

  await changeBookingStatus();

  const reserved = await Reservations.create(req.body);

  const reservedData = {
    _id: reserved._id,
    bookedDate: reserved.bookedDate,
    startHour: reserved.startHour,
    endHour: reserved.endHour,
    totalPrice: reserved.totalPrice,
    Status: reserved.Status,
    Duration: reserved.Duration,
    userID: reserved.userID,
    slotID: reserved.slotID,
    floorID: reserved.floorID,
    buildingId: reserved.buildingId,
    carID: reserved.carID,
    dateSent: reserved.dateSent,
  };

  const actionMade = `User successfully booked a parking slot with the following detais:
  Parking Slot: ${parking.Slot}
  Booked Date: ${reservedData.bookedDate}
  Start Hour: ${reservedData.startHour}
  End Hour: ${reservedData.endHour}
  Total Price: ${reservedData.totalPrice}
  Status: ${reservedData.Status}
  Duration: ${reservedData.Duration}`;

  const buildingId = reserved.buildingId;

  const notificationData = {
    user: req.user.fullNames,
    type: "booking",
    actionMade,
    buildingId,
  };

  await Notification.create(notificationData);

  res.status(201).json({
    message: `A parking slot ${parking.Slot} booked successfully`,
    reservedData,
  });
});
