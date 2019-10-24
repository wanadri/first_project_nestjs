import { Schema } from "mongoose";

export const DeviceSchema = new Schema({
  device_code: {
    type: String,
    required: true,
    unique: true
  },
  active: {
    type: Boolean,
    default: true,
  },
  credential: Object
})