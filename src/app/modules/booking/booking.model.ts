import mongoose, { Schema } from "mongoose";
import IBooking from "./booking.interface";

const bookingSchema = new Schema<IBooking>({
  date: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: false,
  },
  facility: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "facilities",
  },
  payableAmount: {
    type: Number,
    required: false,
  },
  isBooked: {
    type: String,
    required: false,
    enum: ["confirmed", "unconfirmed", "canceled"],
  },
});

export const Booking = mongoose.model<IBooking>("bookings", bookingSchema);
