import { managerEmailMessage } from "../../middleware";
import { Building, User } from "../../models";
import {
  catchAsyncError,
  generateRandomPassword,
  hashPwd,
} from "../../utility";
import cloudinary from "../../utility/cloudinary";
import errorHandler from "../../utility/errorHandlerClass";

export const addNewBuilding = catchAsyncError(async (req, res, next) => {
  try {
    const {
      buildingName,
      District,
      Sector,
      Street,
      Longitude,
      Latitude,
      Description,
      managerNames,
      managerEmail,
      managerPhone,
      managerAddress,
      managerPassword,
    } = req.body;

    if (!managerEmail) {
      return next(new errorHandler("Manager's email is required.", 400));
    }

    const existingUser = await User.findOne({ email: managerEmail });

    if (existingUser) {
      return next(
        new errorHandler(
          `User with the email: ${existingUser.email} already exists. Please choose another email.`,
          409
        )
      );
    }

    const defaultPassword = generateRandomPassword(12);
    const hashedPassword = await hashPwd(defaultPassword);

    req.body.managerPassword = hashedPassword;

    const user = await User.create({
      fullNames: managerNames,
      email: managerEmail,
      phoneNo: managerPhone,
      location: managerAddress,
      password: hashedPassword,
      role: "manager",
      buildingManaged: buildingName,
      buildingAddress: Street,
    });

    let profilePicture = "";

    if (req.file) {
      const buildingImage = await cloudinary.uploader.upload(req.file.path);
      profilePicture = buildingImage.secure_url;
    }

    const newBuilding = await Building.create({
      buildingName,
      District,
      Sector,
      Street,
      Longitude,
      Latitude,
      profilePicture,
      Description,
      managerNames,
      managerEmail,
      managerPhone,
      managerAddress,
      managerAddress,
      managerPassword,
    });

    managerEmailMessage(managerEmail, defaultPassword);

    const { availableSpots, bookedSlots, ...buildingData } =
      newBuilding.toObject();

    const managerID = user._id;

    res.status(201).json({
      message: "The new building data was successfully created",
      buildingData,
      managerID,
    });
  } catch (error) {
    console.log(error);
  }
});
