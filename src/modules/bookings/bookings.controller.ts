/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { BookingServices } from "./bookings.service";

const createBookings: RequestHandler = catchAsync(async (req, res, next) => {
  const bookingData = req.body;
  const result = await BookingServices.createBookings(bookingData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Congratulation !! This slot is booked for you",
    data: result,
  });
});

export const BookingControllers = {
  createBookings,
};
