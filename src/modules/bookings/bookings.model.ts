import { Schema, model } from "mongoose";
import { TBooking } from "./bookings.interface";

const bookingsSchema = new Schema<TBooking>({
  customer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  slot: {
    type: Schema.Types.ObjectId,
    ref: "Slot",
    required: true,
  },
  vehicleType: {
    type: String,
    enum: [
      "car",
      "truck",
      "SUV",
      "van",
      "motorcycle",
      "bus",
      "electricVehicle",
      "hybridVehicle",
      "bicycle",
      "tractor",
    ],
    required: true,
  },
  vehicleBrand: {
    type: String,
    required: true,
  },
  vehicleModel: {
    type: String,
    required: true,
  },
  manufacturingYear: {
    type: Number,
    required: true,
  },
  registrationPlate: {
    type: String,
    required: true,
  },
});

export const BookingModel = model<TBooking>("Booking", bookingsSchema);
