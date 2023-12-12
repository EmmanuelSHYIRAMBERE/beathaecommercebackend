import express from "express";
import parkingRouter from "./accessParkings";
import usersRouter from "./accessUsers";
import bookingsRouter from "./Bookings";
import authenticate from "./aauthentication";
import errorHandler from "../utility/errorHandlerClass";
import { globalErrorController } from "../controllers/Errors";
import stripeRoute from "./payRoute";
import packRouter from "./payPack";
import buildingRouter from "./Buildings";
import floorRouter from "./floors";
import carRouter from "./cars";

const systemRouter = express.Router();

systemRouter.use("/slots", parkingRouter);
systemRouter.use("/buildings", buildingRouter);
systemRouter.use("/users", usersRouter);
systemRouter.use("/floor", floorRouter);
systemRouter.use("/cars", carRouter);
systemRouter.use("/reservations", bookingsRouter);
systemRouter.use("/password", authenticate);
systemRouter.use("/payment", stripeRoute);
systemRouter.use("/momo", packRouter);

systemRouter.all("*", (req, res, next) => {
  next(new errorHandler(`Failure connecting to the server!`, 404));
});

systemRouter.use(globalErrorController);

export default systemRouter;
