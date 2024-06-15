"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingControllers = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const booking_services_1 = require("./booking.services");
const createBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token) {
        throw new AppError_1.default(401, "Unauthorized");
    }
    const booking = req.body;
    const result = yield booking_services_1.BookingServices.createBooking(token, booking);
    res.status(201).json({
        success: true,
        statusCode: 201,
        message: "Booking created successfully",
        data: result,
    });
}));
const getAllBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_services_1.BookingServices.getAllBookings();
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
}));
const getBookingByUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token) {
        throw new AppError_1.default(401, "You are not authorized");
    }
    const result = yield booking_services_1.BookingServices.getBookingByUser(token);
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
}));
const cancelBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield booking_services_1.BookingServices.cancelBooking(id);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Booking cancelled successfully",
        data: result,
    });
}));
const checkAvailability = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = req.query.date || new Date().toISOString().slice(0, 10);
    const result = yield booking_services_1.BookingServices.checkAvailability(date);
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
}));
exports.BookingControllers = {
    createBooking,
    getAllBookings,
    getBookingByUser,
    cancelBooking,
    checkAvailability,
};
