import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { BookingControllers } from "../modules/booking/booking.controller";
import { BookingRoutes } from "../modules/booking/booking.route";
import { FacilityRoutes } from "../modules/facility/facility.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/facility",
    route: FacilityRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/bookings",
    route: BookingRoutes,
  },
];

router.get("/check-availability", BookingControllers.checkAvailability);

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
