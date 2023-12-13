import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
  slotID: {
    type: String,
    required: false,
  },
  userID: {
    type: String,
    required: false,
  },
  carID: {
    type: String,
    required: false,
  },
  bookedDate: {
    type: String,
    required: true,
  },
  startHour: {
    type: Number,
    required: false,
  },
  endHour: {
    type: Number,
    required: false,
  },
  Status: {
    type: String,
    default: "pending",
  },
  dateSent: {
    type: Date,
    default: Date.now,
  },
  approvedDate: {
    type: Date,
    default: null,
  },
});

export const Reservations = mongoose.model("Reservations", bookingSchema);

function validateParkingAccessForDate(date, startHour, endHour) {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();

  const userDate = new Date(date);

  const isBefore = userDate < currentDate;
  const isSame = userDate.getTime() === currentDate.getTime();
  const isAfter = userDate > currentDate;

  const isWithinRange =
    (isSame && currentHour >= startHour && currentHour < endHour) ||
    (isAfter && isBefore);

  return isWithinRange;
}

function isAccessAllowed(userDate, startHour, endHour) {
  const accessDate = new Date(userDate);

  const currentTime = new Date();

  if (currentTime.toDateString() === accessDate.toDateString()) {
    const currentHour = currentTime.getHours();
    if (currentHour >= startHour && currentHour < endHour) {
      return false;
    }
  }

  return true;
}

// const userDate = "2023-12-13";
// const startHour = 9;
// const endHour = 17;

// if (!validateParkingAccessForDate(userDate, startHour, endHour)) {
//   console.log("Access is allowed.");
// } else {
//   console.log("Access is not allowed.");
// }
