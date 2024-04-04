import { ContactUs } from "../models/contactus.model";
import { catchAsyncError } from "../utility";
import errorHandler from "../utility/errorhandler.utility";

export const createContactUs = catchAsyncError(async (req, res, next) => {
  const { firstname, lastname, email, message } = req.body;
  const newContactUs = await ContactUs.create({
    firstname,
    lastname,
    email,
    message,
  });

  res.status(201).json({
    message: "Contact request created successfully",
    data: newContactUs,
  });
});

export const deleteContactUs = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const deletedContactUs = await ContactUs.findByIdAndDelete(id);

  if (!deletedContactUs) {
    return next(new errorHandler("Contact request not found", 404));
  }

  res.status(200).json({ message: "Contact request deleted successfully" });
});

export const getAllContactUs = catchAsyncError(async (req, res, next) => {
  const contactUsList = await ContactUs.find();

  res.status(200).json(contactUsList);
});

export const getSingleContactUs = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const contactUs = await ContactUs.findById(id);

  if (!contactUs) {
    return next(new errorHandler("Contact request not found", 404));
  }

  res.status(200).json(contactUs);
});

export const modifyContactUs = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const updatedContactUs = await ContactUs.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedContactUs) {
    return next(new errorHandler("Contact request not found", 404));
  }

  res.status(200).json({
    message: "Contact request updated successfully",
    data: updatedContactUs,
  });
});
