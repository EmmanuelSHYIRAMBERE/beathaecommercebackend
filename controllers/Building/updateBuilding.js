import { Building } from "../../models";
import { User } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const updateBuilding = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { managerId: newManagerId } = req.body;

  const building = await Building.findById({ _id: id });

  if (!building) {
    return next(new errorHandler(`A building with ID: ${id}, not found`, 404));
  }

  const oldManagerId = building.managerId;

  if (newManagerId !== oldManagerId) {
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

    building.managerId = newManagerId;
    await building.save();
  }

  const updatedBuilding = await Building.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({
    message: `A building with ID: ${id}, updated successfully.`,
    updatedBuilding,
  });
});
