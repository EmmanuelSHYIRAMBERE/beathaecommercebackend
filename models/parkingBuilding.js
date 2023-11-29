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
    required: true,
  },
  availableSpots: {
    type: Number,
    required: false,
  },
  bookedSlots: {
    type: Number,
    required: false,
  },
  managerId: {
    type: String,
    required: true,
  },
});

export const Building = mongoose.model("Building", buildingSchema);
