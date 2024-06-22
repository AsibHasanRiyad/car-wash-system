import { z } from "zod";

const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

const createSlotValidationSchema = z.object({
  body: z.object({
    date: z.string().datetime(),
    startTime: z
      .string()
      .regex(timeRegex, "Invalid time format, should be HH:MM"),
    endTime: z
      .string()
      .regex(timeRegex, "Invalid time format, should be HH:MM"),
    isBooked: z.enum(["available", "booked", "canceled"]),
  }),
});

export const SlotValidations = {
  createSlotValidationSchema,
};
