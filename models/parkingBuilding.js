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
  Capacity: {
    type: Number,
    default: 0,
  },
  availableSpots: {
    type: Number,
    default: 0,
  },
  bookedSlots: {
    type: Number,
    default: 0,
  },
  managerId: {
    type: String,
    required: true,
  },
});

export const Building = mongoose.model("Building", buildingSchema);
