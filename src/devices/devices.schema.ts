import { Schema } from "mongoose";

export const DeviceSchema = new Schema({
  device_code: String,
  active: Boolean,
  credential: Object
})