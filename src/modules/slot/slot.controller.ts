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
    message: "Slots created successfully",
    data: result,
  });
});

const getAllAvailableSlots = catchAsync(async (req, res, next) => {
  const query = req.query;
  const result = await SlotServices.getAllAvailableSlots(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Available slots retrieved successfully",
    data: result,
  });
});
const updateSingleSlot = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { newStatus } = req.body;
  const result = await SlotServices.updateSlotStatus(id, newStatus);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slot status  updated successfully",
    data: result,
  });
});

export const SlotController = {
  createSlot,
  getAllAvailableSlots,
  updateSingleSlot,
};
