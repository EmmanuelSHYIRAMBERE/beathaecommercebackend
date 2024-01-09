import mongoose from "mongoose";

const notificationSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  actionMade: {
    type: String,
    required: true,
  },
  dateSent: {
    type: Date,
    default: Date.now,
  },
});

export const Notification = mongoose.model("Notification", notificationSchema);
