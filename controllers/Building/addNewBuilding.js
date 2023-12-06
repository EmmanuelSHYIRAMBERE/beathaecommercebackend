import { Building } from "../../models";
import { User } from "../../models";
import { catchAsyncError, hashPwd } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const addNewBuilding = catchAsyncError(async (req, res, next) => {
  const { buildingName, Address, managerEmail } = req.body;

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
    location: Address,
    buildingManaged: buildingName,
    buildingAddress: Address,
  });

  const newBuilding = await Building.create({
    buildingName,
    Address,
    managerEmail,
  });

  res.status(201).json({
    message: "The new building data was successfully created",
    buildingData: { building: newBuilding },
  });
});
