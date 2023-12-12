import { Cars } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const getAllCars = catchAsyncError(async (req, res, next) => {
  const ownerID = req.user._id;

  const cars = await Cars.find({ ownerID: ownerID });

  if (!cars) {
    return next(new errorHandler(`You don't have a car`, 404));
  }

  res.status(200).json(cars);
});
