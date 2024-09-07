"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotModel = void 0;
const mongoose_1 = require("mongoose");
const slotSchema = new mongoose_1.Schema({
    serviceId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Service ID is required"],
        ref: "Service",
    },
    date: {
        type: Date,
        required: [true, "Date is required"],
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
}, {
    timestamps: true,
});
exports.SlotModel = (0, mongoose_1.model)("Slot", slotSchema);
