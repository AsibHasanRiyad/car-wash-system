/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

import { RatingService } from "./ratings.service";

const createRatings: RequestHandler = catchAsync(async (req, res, next) => {
  const ratingData = req.body;
  const result = await RatingService.createRatings(ratingData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Thanks for you feedback",
    data: result,
  });
});

const getAllRatings = catchAsync(async (req, res) => {
  const result = await RatingService.getAllRatings();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All ratings retrieved successfully",
    data: result,
  });
});
const getAverageRatings = catchAsync(async (req, res) => {
  const result = await RatingService.averageRatings();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Average ratings retrieved successfully",
    data: result,
  });
});

export const RatingController = {
  createRatings,
  getAllRatings,
  getAverageRatings,
};
