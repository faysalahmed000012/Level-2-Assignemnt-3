"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.BookingServices = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const auth_model_1 = require("../auth/auth.model");
const facility_model_1 = require("../facility/facility.model");
const booking_model_1 = require("./booking.model");
const booking_utils_1 = __importStar(require("./booking.utils"));
const createBooking = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenArray = token.split(" ");
    const decoded = jsonwebtoken_1.default.verify(tokenArray[1], config_1.default.jwt_access_secret);
    const { email } = decoded;
    const userId = yield auth_model_1.User.findOne({ email: email }).select("_id");
    if (!userId) {
        throw new AppError_1.default(404, "User not found");
    }
    const { startTime, endTime, date } = payload;
    const start = +new Date(`1970-01-01T${startTime}`);
    const end = +new Date(`1970-01-01T${endTime}`);
    const pricePerHour = yield facility_model_1.Facility.find({ _id: payload.facility }).select("pricePerHour");
    const payableAmount = (((end - start) / (1000 * 60 * 60)) % 24) * pricePerHour[0].pricePerHour;
    const booking = Object.assign(Object.assign({}, payload), { user: userId._id, payableAmount: payableAmount, isBooked: "confirmed" });
    // checking time conflict
    const assignedSchedules = yield booking_model_1.Booking.find({
        date,
    }).select("date startTime endTime");
    const newSchedule = {
        date,
        startTime,
        endTime,
    };
    if ((0, booking_utils_1.hasTimeConflict)(assignedSchedules, newSchedule)) {
        throw new AppError_1.default(409, "Another Slot available this time");
    }
    const result = booking_model_1.Booking.create(booking);
    return result;
});
const getAllBookings = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find().lean();
    return result;
});
const getBookingByUser = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenArray = token.split(" ");
    const decoded = jsonwebtoken_1.default.verify(tokenArray[1], config_1.default.jwt_access_secret);
    const { email } = decoded;
    const userId = yield auth_model_1.User.findOne({ email: email }).select("_id");
    if (!userId) {
        throw new AppError_1.default(404, "User not found");
    }
    const booking = yield booking_model_1.Booking.find({ user: userId._id }).populate("facility");
    return booking;
});
const cancelBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.findOneAndUpdate({ _id: id }, { isBooked: false }, { new: true });
    return result;
});
const checkAvailability = (date) => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield booking_model_1.Booking.find({ date, isBooked: "confirmed" });
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
    const freeSlots = (0, booking_utils_1.default)(booked);
    return freeSlots;
});
exports.BookingServices = {
    createBooking,
    getAllBookings,
    getBookingByUser,
    cancelBooking,
    checkAvailability,
};
