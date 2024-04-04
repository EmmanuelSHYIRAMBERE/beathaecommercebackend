import { Billing } from "../models/billing.model";
import { catchAsyncError } from "../utility/catchSync";
import errorHandler from "../utility/errorhandler.utility";

export const createBilling = catchAsyncError(async (req, res, next) => {
  if (!req.body) {
    return next(new errorHandler("Add bill details", 400));
  }

  console.log(req.body);

  try {
    const newBilling = await Billing.create(req.body);
    res
      .status(201)
      .json({ message: "Billing created successfully", newBilling });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.email) {
      return next(new errorHandler("Email already exists", 400));
    }
    next(new errorHandler(`Failed to create billing: ${error.message}`, 500));
  }
});

export const getAllBilling = catchAsyncError(async (req, res, next) => {
  try {
    const billings = await Billing.find();
    res.status(200).json(billings);
  } catch (error) {
    next(new errorHandler(`Failed to fetch billings: ${error.message}`, 500));
  }
});

export const viewOneBilling = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  try {
    const billing = await Billing.findById(id);
    if (!billing) {
      return next(new errorHandler("Billing not found", 404));
    }
    res.status(200).json(billing);
  } catch (error) {
    next(new errorHandler(`Failed to fetch billing: ${error.message}`, 500));
  }
});

export const deleteBilling = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedBilling = await Billing.findByIdAndDelete(id);
    if (!deletedBilling) {
      return next(new errorHandler("Billing not found", 404));
    }
    res.status(200).json({ message: "Billing deleted successfully" });
  } catch (error) {
    next(new errorHandler(`Failed to delete billing: ${error.message}`, 500));
  }
});

export const updateBilling = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const updateFields = req.body;
  try {
    const updatedBilling = await Billing.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });
    if (!updatedBilling) {
      return next(new errorHandler("Billing not found", 404));
    }
    res.status(200).json(updatedBilling);
  } catch (error) {
    next(new errorHandler(`Failed to update billing: ${error.message}`, 500));
  }
});
