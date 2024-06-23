/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";
import { TBooking } from "./bookings.interface";
import { BookingModel } from "./bookings.model";
import { ServiceModel } from "../service/service.model";
import { SlotModel } from "../slot/slot.model";

const createBookings = async (payload: TBooking) => {
  // validation
  const customer = await UserModel.findById(payload.customer);
  const service = await ServiceModel.findById(payload.service);
  const slot = await SlotModel.findById(payload.slot);
  if (!customer) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Does not exist");
  }
  if (!service) {
    throw new AppError(httpStatus.BAD_REQUEST, "Service Does not exist");
  }
  if (!slot) {
    throw new AppError(httpStatus.BAD_REQUEST, "Slot Does not exist");
  }
  //   check if slot is already booked
  const slotStatus = slot.isBooked;
  if (slotStatus === "booked") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This slot is not available , Please select another slot"
    );
  }
  //   update isBooked status
  const isBooked = await SlotModel.findOneAndUpdate({ isBooked: "booked" });
  const result = await BookingModel.create(payload);
  return result;
};

export const BookingServices = {
  createBookings,
};
