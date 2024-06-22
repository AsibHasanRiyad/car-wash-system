/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { Services } from "./service.service";

const createService: RequestHandler = catchAsync(async (req, res, next) => {
  const serviceData = req.body;
  const result = await Services.createServiceIntoDB(serviceData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service is created",
    data: result,
  });
});

const getAllServices = catchAsync(async (req, res) => {
  const result = await Services.getAllServices();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Services is retrieved",
    data: result,
  });
});
const getSingleServices = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await Services.getSingleServices(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Service is retrieved",
    data: result,
  });
});

export const ServiceController = {
  createService,
  getAllServices,
  getSingleServices,
};
