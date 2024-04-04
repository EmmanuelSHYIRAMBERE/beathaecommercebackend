import { Order } from "../models/order.model";
import { catchAsyncError } from "../utility/catchSync";
import errorHandler from "../utility/errorhandler.utility";

export const makeOrder = catchAsyncError(async (req, res, next) => {
  const userOrderedId = req.user._id;

  console.log(userOrderedId);

  const userFound = await User.findById(userOrderedId);
  if (!userFound) {
    return next(new errorHandler("You must log in", 401));
  }

  const { products } = req.body;

  const numberOfItems = products.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const amount = products.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );

  req.body.numberOfItems = numberOfItems;
  req.body.amount = amount;
  req.body.userOrderedId = userOrderedId;

  const newOrder = await Order.create(req.body);

  res.status(201).json({
    message: "Order placed successfully",
    order: newOrder,
  });
});

export const deleteOrder = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const deletedOrder = await Order.findByIdAndDelete(id);

  if (!deletedOrder) {
    return next(new errorHandler("Order not found", 404));
  }

  res.status(200).json({
    message: "Order deleted successfully",
  });
});

export const getAllOrder = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  res.status(200).json(orders);
});

export const getSingleOrder = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findById(id);

  if (!order) {
    return next(new errorHandler("Order not found", 404));
  }

  res.status(200).json(order);
});

export const modifyOrder = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const updateFields = req.body;

  const modifiedOrder = await Order.findByIdAndUpdate(id, updateFields, {
    new: true,
    runValidators: true,
  });

  if (!modifiedOrder) {
    return next(new errorHandler("Order not found", 404));
  }

  res.status(200).json({
    message: "Order modified successfully",
    order: modifiedOrder,
  });
});
