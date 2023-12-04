import { use } from "passport";
import { Parkings, User } from "../../models";
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
  const userId = req.user._id;

  const user = await User.findById(userId);

  console.log(user);

  if (!user) {
    return next(new errorHandler(`User not found!`, 404));
  }

  const parking = await Parkings.find();

  const parkings = parking.filter(
    (parking) => parking.building === user.buildingManaged
  );

  console.log(parkings);

  if (parkings.length > 0) {
    if (parkings[0].status === "reserved") {
      const latestTime = calculateTimeAgo(parkings[0].timebooked);

      parkings[0].timebooked = latestTime;

      await parkings[0].save(); // Corrected line
    }
  }

  res.status(200).json({
    data: parkings,
  });
});
