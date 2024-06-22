import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { SlotServices } from "./slot.service";

const createSlot: RequestHandler = catchAsync(async (req, res, next) => {
  const slotData = req.body;
  const result = await SlotServices.createSlotIntoDB(slotData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slot is created",
    data: result,
  });
});

export const SlotController = {
  createSlot,
};
