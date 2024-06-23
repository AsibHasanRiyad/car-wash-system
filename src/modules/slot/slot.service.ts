import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { ServiceModel } from "../service/service.model";
import { TSlot } from "./slot.interface";
import { SlotModel } from "./slot.model";

const createSlotsIntoDB = async (payload: TSlot) => {
  const {
    serviceId,
    date,
    startTime,
    endTime,
    isBooked = "available",
  } = payload;

  const isServiceExist = await ServiceModel.findById(serviceId);
  if (!isServiceExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Service Does not exist");
  }

  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);
  const startTimeInMinutes = startHour * 60 + startMinute;
  const endTimeInMinutes = endHour * 60 + endMinute;

  const slots: TSlot[] = [];

  for (let time = startTimeInMinutes; time < endTimeInMinutes; time += 60) {
    const slotStartHour = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const slotStartMinute = (time % 60).toString().padStart(2, "0");
    const slotEndHour = Math.floor((time + 60) / 60)
      .toString()
      .padStart(2, "0");
    const slotEndMinute = ((time + 60) % 60).toString().padStart(2, "0");

    slots.push({
      serviceId,
      date: new Date(date),
      startTime: `${slotStartHour}:${slotStartMinute}`,
      endTime: `${slotEndHour}:${slotEndMinute}`,
      isBooked,
    });
  }

  const result = await SlotModel.insertMany(slots);
  return result;
};

const getAllAvailableSlots = async (query: Record<string, unknown>) => {
  const searchQuery = SlotModel.find({
    isBooked: { $ne: "booked" },
  });
  const result = await searchQuery.find(query).populate("serviceId");
  return result;
};

export const SlotServices = {
  createSlotsIntoDB,
  getAllAvailableSlots,
};
