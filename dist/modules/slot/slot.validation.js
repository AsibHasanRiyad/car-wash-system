"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotValidations = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const zod_1 = require("zod");
const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
const timeComparisonRefinement = (data) => {
    const [startHour, startMinute] = data.startTime.split(":").map(Number);
    const [endHour, endMinute] = data.endTime.split(":").map(Number);
    const startTime = startHour * 60 + startMinute;
    const endTime = endHour * 60 + endMinute;
    if (endTime <= startTime) {
        throw new Error("endTime must be greater than startTime");
    }
    const minimumGap = 60;
    if (endTime - startTime < minimumGap) {
        throw new Error("The gap between startTime and endTime must be at least 1 hour");
    }
    return true;
};
const createSlotValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        date: zod_1.z.string().datetime(),
        startTime: zod_1.z
            .string()
            .regex(timeRegex, "Invalid time format, should be HH:MM"),
        endTime: zod_1.z
            .string()
            .regex(timeRegex, "Invalid time format, should be HH:MM"),
        isBooked: zod_1.z.enum(["available", "booked", "canceled"]),
    })
        .refine(timeComparisonRefinement, {
        message: "endTime must be greater than startTime",
        path: ["endTime"],
    }),
});
exports.SlotValidations = {
    createSlotValidationSchema,
};
