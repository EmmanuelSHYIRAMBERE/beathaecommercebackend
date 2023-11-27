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
    type: String,
    required: false,
  },
  availableSpots: {
    type: String,
    required: false,
  },
  bookedSlots: {
    type: String,
    required: false,
  },
});

export const Building = mongoose.model("Building", buildingSchema);
