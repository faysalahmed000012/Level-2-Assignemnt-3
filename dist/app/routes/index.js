"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const booking_controller_1 = require("../modules/booking/booking.controller");
const booking_route_1 = require("../modules/booking/booking.route");
const facility_route_1 = require("../modules/facility/facility.route");
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
];
router.get("/check-availability", booking_controller_1.BookingControllers.checkAvailability);
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
