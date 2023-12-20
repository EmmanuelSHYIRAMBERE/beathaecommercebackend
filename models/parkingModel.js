import mongoose from "mongoose";

const parkingSchema = mongoose.Schema({
  Slot: {
    type: String,
    required: true,
  },
  Price: {
    type: String,
    required: false,
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
