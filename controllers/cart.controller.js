import { Cart, Product, User } from "../models";
import { catchAsyncError } from "../utility/catchSync";
import errorHandler from "../utility/errorhandler.utility";

export const createCart = catchAsyncError(async (req, res, next) => {
  const { productId, count } = req.body;
  console.log("Request Body:", req.body); // Log request body for debugging

  if (!productId || !count) {
    return next(new errorHandler("Product ID and count are required.", 400));
  }

  const userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) {
    return next(new errorHandler("User not found.", 404));
  }

  console.log("User...", user);

  const product = await Product.findById(productId);
  if (!product) {
    return next(new errorHandler("Product not found.", 404));
  }

  let cart = await Cart.findOne({ cartBy: userId });

  console.log("cart...", cart);
  if (!cart) {
    cart = new Cart({ cartBy: userId, products: [] });
  }

  const existingProductIndex = cart.products.findIndex((p) =>
    p.product.equals(productId)
  );

  if (existingProductIndex !== -1) {
    cart.products[existingProductIndex].count += count;
  } else {
    cart.products.push({ product: productId, count, price: product.price });
  }

  cart.price = cart.products.reduce(
    (total, item) => total + item.count * item.price,
    0
  );

  // Save the cart before sending the response
  await cart.save();

  console.log("new cart ...", cart);

  res
    .status(201)
    .json({ message: "Product added to cart successfully.", cart });
});
