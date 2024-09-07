"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const service_model_1 = require("../service/service.model");
const slot_model_1 = require("./slot.model");
const createSlotsIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceId, date, startTime, endTime, isBooked = "available", } = payload;
    const isServiceExist = yield service_model_1.ServiceModel.findById(serviceId);
    if (!isServiceExist) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Service Does not exist");
    }
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);
    const startTimeInMinutes = startHour * 60 + startMinute;
    const endTimeInMinutes = endHour * 60 + endMinute;
    const slots = [];
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
    const result = yield slot_model_1.SlotModel.insertMany(slots);
    return result;
});
const getAllAvailableSlots = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchQuery = slot_model_1.SlotModel.find({
        isBooked: { $ne: "booked" },
    });
    const result = yield searchQuery.find(query).populate("serviceId");
    return result;
});
exports.SlotServices = {
    createSlotsIntoDB,
    getAllAvailableSlots,
};
