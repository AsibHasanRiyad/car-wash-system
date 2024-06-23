import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BookingsValidation } from "./bookings.validation";
import { BookingControllers } from "./bookings.controller";
import auth from "../../middlewares/auth";

const router = express.Router();
router.post(
  "/bookings",
  auth("user"),
  validateRequest(BookingsValidation.createBookings),
  BookingControllers.createBookings
);
router.get("/bookings", auth("admin"), BookingControllers.getAllBookings);
router.get("/my-bookings", auth("user"), BookingControllers.getMyBookings);

export const BookingRoute = router;
