import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
import { initiatePayment } from "../../utils/payment";
import { User } from "../auth/auth.model";
import { Facility } from "../facility/facility.model";
import IBooking from "./booking.interface";
import { Booking } from "./booking.model";
import availability, { hasTimeConflict } from "./booking.utils";

const createBooking = async (token: string, payload: Partial<IBooking>) => {
  const tokenArray = token.split(" ");
  const decoded = jwt.verify(
    tokenArray[1],
    config.jwt_access_secret as string
  ) as JwtPayload;
  const { email } = decoded;
  const userId = await User.findOne({ email: email }).select("_id");
  if (!userId) {
    throw new AppError(404, "User not found");
  }
  const { startTime, endTime, date } = payload;
  const start = +new Date(`1970-01-01T${startTime}`);
  const end = +new Date(`1970-01-01T${endTime}`);
  const pricePerHour = await Facility.find({ _id: payload.facility }).select(
    "pricePerHour"
  );
  const payableAmount =
    (((end - start) / (1000 * 60 * 60)) % 24) * pricePerHour[0].pricePerHour;
  console.log(start, end, pricePerHour[0].pricePerHour);
  const tranId = `TXN-${Date.now()}`;
  const booking = {
    ...payload,
    user: userId._id,
    payableAmount: payableAmount,
    isBooked: "unconfirmed",
    tranId,
  };

  // checking time conflict
  const assignedSchedules = await Booking.find({
    date,
    isBooked: "confirmed",
    facility: pricePerHour[0]._id,
  }).select("date startTime endTime");

  const newSchedule = {
    date,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(409, "Another Slot available this time");
  }

  const paymentData = {
    tranId,
    payableAmount,
  };

  const result = await Booking.create(booking);
  const paymentSession = await initiatePayment(paymentData);
  return paymentSession;
};

const getAllBookings = async () => {
  const result = await Booking.find().populate("facility");
  return result;
};

const getBookingByUser = async (token: string) => {
  const tokenArray = token.split(" ");
  const decoded = jwt.verify(
    tokenArray[1],
    config.jwt_access_secret as string
  ) as JwtPayload;
  const { email } = decoded;
  const userId = await User.findOne({ email: email }).select("_id");
  if (!userId) {
    throw new AppError(404, "User not found");
  }

  const booking = await Booking.find({
    user: userId._id,
    isBooked: "confirmed",
  }).populate("facility");
  return booking;
};

const cancelBooking = async (id: string) => {
  const result = await Booking.findOneAndUpdate(
    { _id: id },
    { isBooked: "canceled" },
    { new: true }
  );
  return result;
};

const checkAvailability = async (date: any, id: string) => {
  const bookings = await Booking.find({
    facility: id,
    date,
    isBooked: "confirmed",
  });

  if (!bookings) {
    return {
      startTime: "0:00",
      endTime: "23:00",
    };
  }

  const booked = bookings.map((booking) => {
    return {
      startTime: booking.startTime,
      endTime: booking.endTime,
    };
  });

  const freeSlots = availability(booked);
  return freeSlots;
};

export const BookingServices = {
  createBooking,
  getAllBookings,
  getBookingByUser,
  cancelBooking,
  checkAvailability,
};
