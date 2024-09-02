import mongoose, { Schema } from "mongoose";
import IFacility from "./facility.interface";

const facilitySchema = new Schema<IFacility>({
  name: {
    type: String,
    required: [true, "Facility name is required"],
    trim: true,
    maxlength: [30, "Name can not be more than 30 characters"],
  },
  description: {
    type: String,
    required: true,
  },
  pricePerHour: {
    type: Number,
    required: true,
  },
  imgUrl: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const Facility = mongoose.model("facilities", facilitySchema);
