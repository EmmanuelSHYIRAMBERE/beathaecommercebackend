import { Building } from "../../models";
import { User } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const updateBuilding = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;

    const building = await Building.findById(id);

    if (!building) {
      return next(new errorHandler(`A building with ID: ${id} not found`, 404));
    }

    const oldManagerEmail = building.managerEmail;

    building.buildingName = req.body.buildingName || building.buildingName;
    building.Address = req.body.Address || building.Address;
    building.managerEmail = req.body.managerEmail || building.managerEmail;

    await building.save();

    let newManager;

    if (req.body.managerEmail && req.body.managerEmail !== oldManagerEmail) {
      newManager = await User.findOne({ email: req.body.managerEmail });

      if (newManager) {
        newManager.email = req.body.managerEmail;
        newManager.buildingManaged = req.body.buildingName;
        newManager.buildingAddress = req.body.Address;
        await newManager.save();
      }
    }

    const filteredData = {
      _id: building._id,
      Name: building.buildingName,
      location: building.Address,
      managerEmail: building.managerEmail,
    };

    console.log("updatedBuildingData", req.body);
    console.log("newManager", newManager);

    res.status(200).json({
      message: `Building with ID: ${id} updated successfully.`,
      filteredData,
      newManager,
    });
  } catch (error) {
    next(new errorHandler("Internal Server Error", 500));
  }
});
