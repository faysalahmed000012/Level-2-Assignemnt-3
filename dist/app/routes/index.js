"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const booking_controller_1 = require("../modules/booking/booking.controller");
const booking_route_1 = require("../modules/booking/booking.route");
const facility_route_1 = require("../modules/facility/facility.route");
const payment_route_1 = require("../modules/payment/payment.route");
const user_route_1 = require("../modules/user/user.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/facility",
        route: facility_route_1.FacilityRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/bookings",
        route: booking_route_1.BookingRoutes,
    },
    {
        path: "/users",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/payment",
        route: payment_route_1.paymentRoutes,
    },
];
router.get("/check-availability", booking_controller_1.BookingControllers.checkAvailability);
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
