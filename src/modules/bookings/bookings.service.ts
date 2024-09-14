/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";
import { TBooking } from "./bookings.interface";
import { BookingModel } from "./bookings.model";
import { ServiceModel } from "../service/service.model";
import { SlotModel } from "../slot/slot.model";
import { initiatePayment } from "../payment/payment.module";

const createBookings = async (payload: TBooking) => {
  // validation
  const customer = await UserModel.findById(payload.customer);
  const service = await ServiceModel.findById(payload.service);
  const slot = await SlotModel.findById(payload.slot);
  if (!customer) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Does not exist");
  }
  if (customer.role === "admin") {
    throw new AppError(httpStatus.BAD_REQUEST, "Admin can not book a service");
  }
  if (!service) {
    throw new AppError(httpStatus.BAD_REQUEST, "Service Does not exist");
  }
  if (!slot) {
    throw new AppError(httpStatus.BAD_REQUEST, "Slot Does not exist");
  }
  if (slot.isBooked === "canceled") {
    throw new AppError(httpStatus.BAD_REQUEST, "Slot is canceled");
  }
  //   check if slot is already booked
  const slotStatus = slot.isBooked;
  if (slotStatus === "booked") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This slot is not available , Please select another slot"
    );
  }

  const transactionId = `TXN-${Date.now()}`;
  const paymentData = {
    transactionId,
    amount: service.price,
    name: customer.name,
    email: customer.email,
    address: customer.address,
    phone: customer.phone,
  };
  const paymentSession = await initiatePayment({ paymentData });
  //   update transactionId
  await SlotModel.findByIdAndUpdate(slot._id, { transactionId });
  const result = (
    await (await BookingModel.create(payload)).populate("service")
  ).populate("slot");
  return paymentSession;
};

const getAllBookings = async () => {
  const result = await BookingModel.find()
    .populate("customer")
    .populate("service")
    .populate("slot");
  return result;
};
const getMyBookings = async (customerId: any) => {
  const result = await BookingModel.find({ customer: customerId })
    .populate("customer")
    .populate("service")
    .populate("slot");
  return result;
};

export const BookingServices = {
  createBookings,
  getAllBookings,
  getMyBookings,
};
