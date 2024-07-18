import { Schema, model, models } from "mongoose"

const MessageSchema = new Schema({
  fullName: String,
  email: String,
  phone: Number,
  communication: String,
  location: String,
  message: String,
}, {
  timestamps: true,
});

export const Message = models?.Message || model('Message', MessageSchema);