import mongoose from "mongoose";

const parkingSchema = mongoose.Schema({
  Slot: {
    type: String,
    required: true,
  },
  District: {
    type: String,
    required: false,
  },
  Sector: {
    type: String,
    required: false,
  },
  Longitude: {
    type: String,
    required: false,
  },
  Latitude: {
    type: String,
    required: false,
  },
  building: {
    type: String,
    required: false,
  },
  timebooked: {
    type: String,
    required: false,
  },
  latestTime: {
    type: String,
    required: false,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

export const Parkings = mongoose.model("Parkings", parkingSchema);
