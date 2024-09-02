import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import { BookingServices } from "./booking.services";

const createBooking = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new AppError(401, "Unauthorized");
  }
  const booking = req.body;
  const result = await BookingServices.createBooking(token, booking);

  // console.log(result);
  res.status(201).json({
    success: true,
    statusCode: 201,
    message: "Booking created successfully",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookings();
  if (result.length === 0) {
    res.status(400).json({
      success: false,
      statusCode: 404,
      message: "No Data Found",
      data: [],
    });
  }

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

const getBookingByUser = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new AppError(401, "You are not authorized");
  }

  const result = await BookingServices.getBookingByUser(token);
  if (result.length === 0) {
    res.status(400).json({
      success: false,
      statusCode: 404,
      message: "No Data Found",
      data: [],
    });
  }

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

const cancelBooking = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await BookingServices.cancelBooking(id);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Booking cancelled successfully",
    data: result,
  });
});

const checkAvailability = catchAsync(async (req, res) => {
  const date = req.query.date || new Date().toISOString().slice(0, 10);
  const id = req.query.facility as string;
  console.log(req.query);
  const result = await BookingServices.checkAvailability(date, id);
  if (result.length === 0) {
    res.status(400).json({
      success: false,
      statusCode: 404,
      message: "No Data Found",
      data: [],
    });
  }

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Availability Checked successfully",
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
  getBookingByUser,
  cancelBooking,
  checkAvailability,
};
