import { Schema, model } from "mongoose";
import { TSlot } from "./slot.interface";

const slotSchema = new Schema<TSlot>(
  {
    serviceId: {
      type: Schema.Types.ObjectId,
      required: [true, "Service ID is required"],
      ref: "Service",
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    transactionId: {
      type: String,
      required: false,
    },
    startTime: {
      type: String,
      required: [true, "Start time is required"],
    },
    endTime: {
      type: String,
      required: [true, "End time is required"],
    },
    isBooked: {
      type: String,
      enum: ["available", "booked", "canceled"],
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

export const SlotModel = model<TSlot>("Slot", slotSchema);
