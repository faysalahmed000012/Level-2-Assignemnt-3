import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../auth/auth.constants";
import { BookingControllers } from "./booking.controller";
import bookingValidationSchema from "./booking.zod.validation";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.user),
  validateRequest(bookingValidationSchema),
  BookingControllers.createBooking
);

router.get("/", auth(USER_ROLE.admin), BookingControllers.getAllBookings);

router.get("/user", auth(USER_ROLE.user), BookingControllers.getBookingByUser);
router.delete("/:id", auth(USER_ROLE.user), BookingControllers.cancelBooking);

export const BookingRoutes = router;
