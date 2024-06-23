/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { SlotServices } from "./slot.service";

const createSlot: RequestHandler = catchAsync(async (req, res, next) => {
  const slotData = req.body;
  const result = await SlotServices.createSlotsIntoDB(slotData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slot is created",
    data: result,
  });
});

const getAllAvailableSlots = catchAsync(async (req, res, next) => {
  const query = req.query;
  const result = await SlotServices.getAllAvailableSlots(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All The Slot is retrieved",
    data: result,
  });
});

export const SlotController = {
  createSlot,
  getAllAvailableSlots,
};
