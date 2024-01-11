import mongoose from "mongoose";

const bookingSchema = mongoose.Schema(
  {
    slotID: {
      type: String,
      required: false,
    },
    carID: {
      type: String,
      required: false,
    },
    userID: {
      type: String,
      required: false,
    },
    floorID: {
      type: String,
      required: false,
    },
    buildingId: {
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
    totalPrice: {
      type: Number,
      required: false,
    },
    Duration: {
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
  },
  { timestamps: true }
);

export const Reservations = mongoose.model("Reservations", bookingSchema);
