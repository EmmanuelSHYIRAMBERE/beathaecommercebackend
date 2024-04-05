import { Cart, Product, User } from "../models";
import { catchAsyncError } from "../utility/catchSync";
import errorHandler from "../utility/errorhandler.utility";

export const createCart = catchAsyncError(async (req, res, next) => {
  if (!req.body) {
    return next(new errorHandler("Product ID and count are required.", 400));
  }

  try {
    const { products } = req.body;

    if (!products || !products.length) {
      return next(
        new errorHandler("Cart must contain at least one product.", 400)
      );
    }

    for (const product of products) {
      const item = await Product.findById({ _id: product.productId });
      if (!item) {
        return next(
          new errorHandler(`Product with ID: ${product} not found`, 400)
        );
      }
    }

    console.log("items:", products);

    const userId = req.user._id;

    const user = await User.findById({ _id: userId });

    console.log("user:", user);
    if (!user) {
      return next(new errorHandler("User not found.", 400));
    }

    // Create a new cart object
    const cart = new Cart({
      products: products.map((product) => ({
        product: product.product,
        count: product.count,
        totalPrice: product.product * product.count,
      })),
      cartBy: user._id,
    });

    console.log("cart:", cart);
    // Save the cart to the database
    await cart.save();

    // Send successful response with the created cart
    res.status(201).json({
      success: true,
      message: "Cart created successfully.",
      cart,
    });
  } catch (error) {
    console.log(error);
    next(new errorHandler(error, 500));
  }
});

export const getCartById = catchAsyncError(async (req, res, next) => {
  const { cartId } = req.params;

  try {
    const cart = await Cart.findById(cartId).populate(
      "products.product cartBy"
    );

    if (!cart) {
      return next(new errorHandler("Cart not found.", 404));
    }

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

export const updateCart = catchAsyncError(async (req, res, next) => {
  const { cartId } = req.params;
  const { products, cartBy } = req.body;

  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      { products, cartBy },
      { new: true, runValidators: true }
    );

    if (!updatedCart) {
      return next(new errorHandler("Cart not found.", 404));
    }

    res.status(200).json({
      success: true,
      data: updatedCart,
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

export const deleteCart = catchAsyncError(async (req, res, next) => {
  const { cartId } = req.params;

  try {
    const deletedCart = await Cart.findByIdAndDelete(cartId);

    if (!deletedCart) {
      return next(new errorHandler("Cart not found.", 404));
    }

    res.status(200).json({
      success: true,
      message: "Cart deleted successfully.",
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});
