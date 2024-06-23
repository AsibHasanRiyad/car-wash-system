import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BookingsValidation } from "./bookings.validation";
import { BookingControllers } from "./bookings.controller";

const router = express.Router();
router.post(
  "/",
  validateRequest(BookingsValidation.createBookings),
  BookingControllers.createBookings
);
router.get("/", BookingControllers.getAllBookings);
router.get("/my-bookings", BookingControllers.getMyBookings);

export const BookingRoute = router;
