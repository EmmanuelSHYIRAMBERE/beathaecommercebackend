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
    type: String,
    required: false,
  },
  endHour: {
    type: String,
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

function validateParkingAccessForDate(userDate, startHour, endHour) {
  const accessDate = Date.parse(userDate + "T" + startHour);
  const endDate = Date.parse(userDate + "T" + endHour);

  console.log("Access date", accessDate);

  const currentTime = Date.now();

  console.log(currentTime);

  if (
    isNaN(accessDate) ||
    isNaN(endDate) ||
    currentTime >= accessDate ||
    accessDate > endDate
  ) {
    return false;
  }
  return true;
}
