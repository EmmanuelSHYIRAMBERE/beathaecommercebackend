import { Notification } from "../../models";
import { catchAsyncError } from "../../utility";

export const getAllBuildings = catchAsyncError(async (req, res, next) => {
  const notifications = await Notification.find({});

  res.status(200).json({ notifications });
});
