import mongoose from "mongoose";

const buildingSchema = mongoose.Schema({
  buildingName: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  availableSpots: {
    type: Number,
    default: 0,
  },
  bookedSlots: {
    type: Number,
    default: 0,
  },
  managerEmail: {
    type: String,
    required: true,
  },
});

export const Building = mongoose.model("Building", buildingSchema);
