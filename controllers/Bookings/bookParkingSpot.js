import { Parkings, Reservations } from "../../models";
import { User } from "../../models";
import { receiveBookingEmail } from "../../middleware";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const bookParkingSpot = catchAsyncError(async (req, res, next) => {
  const parkingID = req.body.parkingID;
  const parking = await Parkings.findById({ _id: parkingID });
  if (!parking) {
    return next(
      new errorHandler(`A parking spot with ID: ${parkingID} is not found`, 404)
    );
  }

  const userID = req.body.userID;
  const user = await User.findById({ _id: userID });
  if (!user) {
    return next(
      new errorHandler(`A user with ID: ${userID} is not found`, 404)
    );
  }
  const bookingParkingSpot = new Reservations(req.body);

  parking.availability = "reserved";
  bookingParkingSpot.building = parking.building;

  bookingParkingSpot.payableAmount = parking.Amount;

  const updatedParking = await parking.save();

  await bookingParkingSpot.save();

  receiveBookingEmail(user.email, user.fullNames);

  res.status(201).json({
    message: `A parking spot with ID: ${parkingID} is successfully booked`,
    reservationData: { bookingParkingSpot },
    parkingData: { updatedParking },
    userData: { user },
  });
});
