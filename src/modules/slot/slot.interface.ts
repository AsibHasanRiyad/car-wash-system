import { Types } from "mongoose";

export type TSlot = {
  serviceId: Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: "available" | "booked" | "canceled";
};
