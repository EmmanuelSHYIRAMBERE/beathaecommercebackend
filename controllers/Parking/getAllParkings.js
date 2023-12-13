import { use } from "passport";
import { Building, Floors, Parkings, User } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

const calculateTimeAgo = (timebooked) => {
  const current_time = new Date();
  const time_booked = new Date(timebooked);
  const time_diff = current_time - time_booked;
  const seconds = time_diff / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;

  if (seconds < 60) {
    return `${Math.floor(seconds)} seconds ago`;
  } else if (minutes < 60) {
    return `${Math.floor(minutes)} minutes ago`;
  } else if (hours < 24) {
    return `${Math.floor(hours)} hours ago`;
  } else {
    return `${Math.floor(days)} days ago`;
  }
};

export const getTotalParking = catchAsyncError(async (req, res, next) => {
  const email = req.user.email;

  const building = await Building.findOne({ managerEmail: email });

  if (!building) {
    return next(new errorHandler(`You are not authorized!`, 401));
  }

  const floors = await Floors.find({ buildingId: building._id });

  if (!floors || floors.length === 0) {
    return next(new errorHandler(`No floors found!`, 401));
  }

  const totalFloors = floors.length;

  const slots = await Parkings.find({ floorID: floors._id });

  if (!slots || slots.length === 0) {
    return next(new errorHandler(`No slots found!`, 401));
  }

  res.status(200).json({
    Floors: totalFloors,
    slots,
  });
});
