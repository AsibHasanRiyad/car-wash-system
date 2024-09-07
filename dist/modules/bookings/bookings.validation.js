"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsValidation = void 0;
const zod_1 = require("zod");
const createBookings = zod_1.z.object({
    body: zod_1.z.object({
        vehicleType: zod_1.z.enum([
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
        ]),
        vehicleBrand: zod_1.z.string(),
        vehicleModel: zod_1.z.string(),
        manufacturingYear: zod_1.z.number(),
        registrationPlate: zod_1.z.string(),
    }),
});
exports.BookingsValidation = {
    createBookings,
};
