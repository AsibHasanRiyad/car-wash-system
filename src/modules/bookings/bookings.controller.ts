import jwt, { JwtPayload } from "jsonwebtoken";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { BookingServices } from "./bookings.service";
import config from "../../config";
import { UserModel } from "../user/user.model";
import { Types } from "mongoose";
import { TUser } from "../user/user.interface";
import AppError from "../../errors/AppError";

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
  const token = req.headers.authorization;
  const decoded = jwt.verify(
    token as string,
    config.jwt_access_secret as string
  ) as JwtPayload;
  const { email } = decoded;
  const customer = await UserModel.findOne({ email: email });
  const customerId = (customer as TUser)._id;
  const result = await BookingServices.getMyBookings(customerId);
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
