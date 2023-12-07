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

  if (!user) {
    return next(new errorHandler(`User not found!`, 404));
  }

  const parking = await Parkings.find({ building: user.buildingManaged });

  for (const park of parking) {
    if (park.status === "reserved" && park.timebooked) {
      const lastTime = calculateTimeAgo(park.timebooked);
      park.latestTime = lastTime;
      await park.save();
    }
  }

  const formattedParkings = parking.map((park) => ({
    _id: park._id,
    Name: park.parkingName,
    Amount: park.Amount,
    Building: park.building,
    Location: park.Address,
    latestTime: park.latestTime,
    status: park.status,
  }));

  res.status(200).json({
    data: formattedParkings,
  });
});
