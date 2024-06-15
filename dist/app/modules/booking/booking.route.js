"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_constants_1 = require("../auth/auth.constants");
const booking_controller_1 = require("./booking.controller");
const booking_zod_validation_1 = __importDefault(require("./booking.zod.validation"));
const router = (0, express_1.Router)();
router.post("/", (0, auth_1.default)(auth_constants_1.USER_ROLE.user), (0, validateRequest_1.default)(booking_zod_validation_1.default), booking_controller_1.BookingControllers.createBooking);
router.get("/", (0, auth_1.default)(auth_constants_1.USER_ROLE.admin), booking_controller_1.BookingControllers.getAllBookings);
router.get("/user", (0, auth_1.default)(auth_constants_1.USER_ROLE.user), booking_controller_1.BookingControllers.getBookingByUser);
router.delete("/:id", (0, auth_1.default)(auth_constants_1.USER_ROLE.user), booking_controller_1.BookingControllers.cancelBooking);
exports.BookingRoutes = router;
