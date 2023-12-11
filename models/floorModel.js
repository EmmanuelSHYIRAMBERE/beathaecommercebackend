import mongoose from "mongoose";

const floorSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  buildingId: {
    type: String,
    required: true,
  },
});

export const Floors = mongoose.model("Floors", floorSchema);
