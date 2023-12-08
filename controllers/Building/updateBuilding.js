import { Building, User } from "../../models";
import { catchAsyncError } from "../../utility";
import cloudinary from "../../utility/cloudinary";
import errorHandler from "../../utility/errorHandlerClass";

export const updateBuilding = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;

    const building = await Building.findById(id);

    if (!building) {
      return next(new errorHandler(`Building with ID: ${id} not found`, 404));
    }

    const oldManagerEmail = building.managerEmail;

    building.buildingName = req.body.buildingName || building.buildingName;
    building.District = req.body.District || building.District;
    building.Sector = req.body.Sector || building.Sector;
    building.Street = req.body.Street || building.Street;
    building.Longitude = req.body.Longitude || building.Longitude;
    building.Latitude = req.body.Latitude || building.Latitude;
    building.Price = req.body.Price || building.Price;
    building.Floors = req.body.Floors || building.Floors;
    building.Description = req.body.Description || building.Description;
    building.managerEmail = req.body.managerEmail || building.managerEmail;

    let profilePicture = building.profilePicture;

    if (req.file) {
      const buildingImage = await cloudinary.uploader.upload(req.file.path);
      profilePicture = buildingImage.secure_url;
    }

    await building.save();

    let newManager;

    if (req.body.managerEmail && req.body.managerEmail !== oldManagerEmail) {
      newManager = await User.findOne({ email: req.body.managerEmail });

      if (newManager) {
        newManager.email = req.body.managerEmail;
        newManager.buildingManaged = req.body.buildingName;
        newManager.buildingAddress = req.body.Street;
        await newManager.save();
      }
    }

    const filteredData = {
      _id: building._id,
      buildingName: building.buildingName,
      District: building.District,
      Sector: building.Sector,
      Street: building.Street,
      Longitude: building.Longitude,
      Latitude: building.Latitude,
      Price: building.Price,
      profilePicture: profilePicture,
      Floors: building.Floors,
      Description: building.Description,
      managerEmail: building.managerEmail,
    };

    res.status(200).json({
      message: `Building with ID: ${id} updated successfully.`,
      filteredData,
    });
  } catch (error) {
    console.error(error);
    next(new errorHandler("Internal Server Error", 500));
  }
});
