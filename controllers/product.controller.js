import { Cart, User } from "../models";
import { Product } from "../models/product.model";
import { catchAsyncError } from "../utility";
import cloudinary from "../utility/cloudinary";
import errorHandler from "../utility/errorhandler.utility";

export const createProduct = catchAsyncError(async (req, res, next) => {
  let { price, stock_quantity } = req.body;

  let productImagesArray = [];

  if (req.file) {
    const image = await cloudinary.uploader.upload(req.file.path);
    productImage = image.secure_url;
  }

  if (req.files["productImage"]) {
    for (let index = 0; index < req.files["productImage"].length; index++) {
      productImagesArray.push(
        await cloudinary.uploader.upload(req.files["productImage"][index].path)
      );
    }
  }

  const productImage = req.files["productImage"]
    ? productImagesArray.map((item) => item.secure_url)
    : "";
  const totalPrice = price * stock_quantity;
  console.log("Total Price:", totalPrice);

  req.body.total_price = totalPrice;
  req.body.productImage = productImage;

  const NewProduct = await Product.create(req.body);

  res.status(201).json({
    message: "The new Product data was successfully created",
    NewProduct: NewProduct,
  });
});

export const getAllProduct = catchAsyncError(async (req, res, next) => {
  const allProducts = await Product.find();

  if (allProducts.length === 0) {
    return next(new errorHandler("Products not found", 404));
  }

  res.status(200).json({
    message: "Products retrieved successfully",
    products: allProducts,
  });
});

export const viewOneProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    return next(new errorHandler("Product not found", 404));
  }

  res.status(200).json({
    message: "Product retrieved successfully",
    product: product,
  });
});

export const deleteProduct = catchAsyncError(async (req, res, next) => {
  const productId = req.params.id;

  const product = await Product.findByIdAndDelete(productId);

  if (!product) {
    return next(new errorHandler("Product not found", 404));
  }

  res.status(200).json({ message: "Product deleted successfully", product });
});
