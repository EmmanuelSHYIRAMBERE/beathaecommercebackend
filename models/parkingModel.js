import mongoose from "mongoose";

const parkingSchema = mongoose.Schema({
  Slot: {
    type: String,
    required: true,
  },
  Price: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  floorID: {
    type: String,
    required: false,
  },
});

export const Parkings = mongoose.model("Parkings", parkingSchema);
