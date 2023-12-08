import { Building, User } from "../../models";
import { catchAsyncError, hashPwd } from "../../utility";
import cloudinary from "../../utility/cloudinary";
import errorHandler from "../../utility/errorHandlerClass";

export const addNewBuilding = catchAsyncError(async (req, res, next) => {
  const {
    buildingName,
    District,
    Sector,
    Street,
    Longitude,
    Latitude,
    Price,
    Floors,
    Description,
    managerEmail,
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

  const defaultPassword = "manager123";
  const hashedPassword = await hashPwd(defaultPassword);

  await User.create({
    email: managerEmail,
    password: hashedPassword,
    role: "manager",
    location: District,
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
    Price,
    profilePicture,
    Floors,
    Description,
    managerEmail,
  });

  const { availableSpots, bookedSlots, ...buildingData } =
    newBuilding.toObject();

  res.status(201).json({
    message: "The new building data was successfully created",
    buildingData: { building: buildingData },
  });
});
