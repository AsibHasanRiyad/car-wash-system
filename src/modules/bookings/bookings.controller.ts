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
    message: "Booking successful",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookings();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All bookings retrieved successfully",
    data: result,
  });
});
const getMyBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getMyBookings();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User bookings retrieved successfully",
    data: result,
  });
});

export const BookingControllers = {
  createBookings,
  getAllBookings,
  getMyBookings,
};
