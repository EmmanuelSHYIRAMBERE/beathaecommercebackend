import express from "express";
import errorHandler from "../utility/errorhandler.utility";
import { globalErrorController } from "../controllers";
import authRoute from "./auth.route";
import usersRouter from "./user.route";
import productRouter from "./product.route";
import billingRoute from "./billing.route";
import contactUsRouter from "./contactus.route";
import orderRouter from "./order.route";
import { Cart } from "../models";
import cartRouter from "./cart.route";

const systemRouter = express.Router();

systemRouter.use("/auth", authRoute);
systemRouter.use("/users", usersRouter);
systemRouter.use("/product", productRouter);
systemRouter.use("/cart", cartRouter);
systemRouter.use("/billing", billingRoute);
systemRouter.use("/contactus", contactUsRouter);
systemRouter.use("/orders", orderRouter);

systemRouter.all("*", (req, res, next) => {
  next(new errorHandler(`Failure connecting to the server!`, 404));
});
systemRouter.use(globalErrorController);

export default systemRouter;
