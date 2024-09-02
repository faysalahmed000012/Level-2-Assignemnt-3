import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { BookingControllers } from "../modules/booking/booking.controller";
import { BookingRoutes } from "../modules/booking/booking.route";
import { FacilityRoutes } from "../modules/facility/facility.route";
import { paymentRoutes } from "../modules/payment/payment.route";
import { UserRoutes } from "../modules/user/user.route";

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
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/payment",
    route: paymentRoutes,
  },
];

router.get("/check-availability", BookingControllers.checkAvailability);

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
