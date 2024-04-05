import { Order } from "../models/order.model";
import { Cart } from "../models/cart.model";
import { catchAsyncError } from "../utility/catchSync";
import errorHandler from "../utility/errorhandler.utility";
import { User } from "../models";

export const makeOrder = catchAsyncError(async (req, res, next) => {
  const userOrderedId = req.user._id;

  try {
    const user = await User.findById(userOrderedId);
    if (!user) {
      return next(new errorHandler("User not found", 404));
    }

    const cartItems = await Cart.find({ cartBy: userOrderedId });
    if (!cartItems || cartItems.length === 0) {
      return next(new errorHandler("Cart is empty", 400));
    }

    const numberOfItems = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    const amount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.priceperitem,
      0
    );

    const products = cartItems.map((cartItem) => ({
      product: cartItem.productId,
      quantity: cartItem.quantity,
      price: cartItem.priceperitem,
    }));

    const orderData = {
      customerName: user.fullNames,
      products,
      numberOfItems,
      amount,
      userOrderedId,
      shippingAddress: req.body.address,
      paymentMethod: req.body.paymentMethod,
    };

    const newOrder = await Order.create(orderData);

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

export const deleteOrder = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return next(new errorHandler("Order not found", 404));
    }

    res.status(200).json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

export const getAllOrders = catchAsyncError(async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

export const getSingleOrder = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return next(new errorHandler("Order not found", 404));
    }

    res.status(200).json(order);
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

export const modifyOrder = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const updateFields = req.body;

  try {
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
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});
