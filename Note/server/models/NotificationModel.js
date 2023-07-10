import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  content: {
    type: String,
  }
}, {timestamps: true})

const notificationModel = mongoose.model('Notification', notificationSchema)
export default notificationModel