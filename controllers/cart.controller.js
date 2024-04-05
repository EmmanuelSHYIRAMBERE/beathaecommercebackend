import { Cart, Product, User } from "../models";
import { catchAsyncError } from "../utility/catchSync";
import errorHandler from "../utility/errorhandler.utility";

// Create a new cart or update an existing one
export const addToCart = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  const { quantity } = req.body;
  const productId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(new errorHandler("User must login", 400));
    }

    const product = await Product.findById(productId);
    if (!product) {
      return next(new errorHandler("Product not found", 404));
    }

    // Check if there is an existing cart with the same product and user
    const existingCart = await Cart.findOne({
      productId,
      cartBy: userId,
    });

    if (existingCart) {
      // If an existing cart is found, update its quantity and totalPrice
      existingCart.quantity += quantity;
      existingCart.totalPrice = product.price * existingCart.quantity;
      await existingCart.save();

      res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        updatedCart: existingCart,
      });
    } else {
      // If no existing cart, create a new one
      const newCart = new Cart({
        productId,
        quantity,
        priceperitem: product.price,
        totalPrice: product.price * quantity,
        cartBy: userId,
      });
      const productAddedToCart = await newCart.save();

      res.status(201).json({
        success: true,
        message: "Cart created successfully",
        productAddedToCart,
      });
    }
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

// Get all carts of a user
export const getAllCarts = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(new errorHandler("User not found", 404));
    }

    const carts = await Cart.find({ cartBy: userId });

    res.status(200).json({
      success: true,
      carts,
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

// Get a specific cart by ID
export const getCartById = catchAsyncError(async (req, res, next) => {
  const cartId = req.params.id;

  try {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return next(new errorHandler("Cart not found", 404));
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

// Update a cart by ID
export const updateCart = catchAsyncError(async (req, res, next) => {
  const cartId = req.params.id;
  const { quantity } = req.body;

  try {
    let cart = await Cart.findById(cartId);
    if (!cart) {
      return next(new errorHandler("Cart not found", 404));
    }

    cart.quantity = quantity;
    cart.totalPrice = cart.priceperitem * quantity;
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      updatedCart: cart,
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

// Delete a cart by ID
export const deleteCart = catchAsyncError(async (req, res, next) => {
  const cartId = req.params.id;

  try {
    const cart = await Cart.findByIdAndDelete(cartId);
    if (!cart) {
      return next(new errorHandler("Cart not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Cart deleted successfully",
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

// Clear all carts of a user
export const clearUserCart = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(new errorHandler("User not found", 404));
    }

    await Cart.deleteMany({ cartBy: userId });

    res.status(200).json({
      success: true,
      message: "Carts cleared successfully",
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});
