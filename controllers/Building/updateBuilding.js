import { Building } from "../../models";
import { User } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const updateBuilding = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  console.log("Building ID:", id);

  const { managerId: newManagerId, buildingName, Address, Capacity } = req.body;

  const building = await Building.findById({ _id: id });

  if (!building) {
    return next(new errorHandler(`A building with ID: ${id}, not found`, 404));
  }

  const oldManagerId = building.managerId;

  console.log("newManagerId", newManagerId);

  if (newManagerId && newManagerId !== oldManagerId) {
    const newManager = await User.findById({ _id: newManagerId });

    if (!newManager) {
      return next(
        new errorHandler(`User with ID: ${newManagerId} not found`, 404)
      );
    }

    const otherBuildingsManaged = await Building.find({
      managerId: oldManagerId,
      _id: { $ne: id },
    });

    if (otherBuildingsManaged.length === 0) {
      const oldManager = await User.findById({ _id: oldManagerId });

      if (oldManager) {
        oldManager.role = "user";
        oldManager.buildingManaged = null;
        oldManager.buildingAddress = null;
        await oldManager.save();
      }
    }

    newManager.role = "manager";
    newManager.buildingManaged = building.buildingName;
    newManager.buildingAddress = building.Address;
    await newManager.save();

    req.body.buildingName = req.body.buildingName || building.buildingName;
    req.body.Address = req.body.Address || building.Address;
    req.body.Capacity = req.body.Capacity || building.Capacity;
    req.body.managerId = req.body.managerId || newManagerId;

    const updatedBuilding = await Building.findByIdAndUpdate(
      id,
      { $set: { buildingName, Address, Capacity } },
      { new: true }
    );

    res.status(200).json({
      message: `A building with ID: ${id}, updated successfully.`,
      updatedBuilding,
    });
  } else {
    res.status(200).json({
      message: "No updates were made to the building.",
      building,
    });
  }
});
