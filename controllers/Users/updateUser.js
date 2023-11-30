import { User, Admin } from "../../models";
import cloudinary from "../../utility/cloudinary";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";
import profileImagesUpload from "../../middleware/profileMulter";

export const updateUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
  });

  if (req.file) {
    const profilePicture = await cloudinary.uploader.upload(req.file.path);
    user.profilePicture = profilePicture.secure_url;
    await user.save();
  }

  console.log(profilePicture);
  // Ensure that the 'profilePicture' field is included in the response
  res.status(200).json({
    message: "User updated successfully",
    user: {
      ...user.toObject(), // Convert Mongoose document to plain object
      profilePicture: user.profilePicture, // Include 'profilePicture' field
    },
  });
});
