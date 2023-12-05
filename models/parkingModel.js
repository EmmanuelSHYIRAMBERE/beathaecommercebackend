import mongoose from "mongoose";

const parkingSchema = mongoose.Schema({
  parkingID: {
    type: String,
    required: true,
  },
  Amount: {
    type: Number,
    required: true,
  },
  Address: {
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
    type: String,
    default: "available",
  },
});

export const Parkings = mongoose.model("Parkings", parkingSchema);
