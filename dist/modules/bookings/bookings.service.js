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
exports.BookingServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const bookings_model_1 = require("./bookings.model");
const service_model_1 = require("../service/service.model");
const slot_model_1 = require("../slot/slot.model");
const createBookings = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // validation
    const customer = yield user_model_1.UserModel.findById(payload.customer);
    const service = yield service_model_1.ServiceModel.findById(payload.service);
    const slot = yield slot_model_1.SlotModel.findById(payload.slot);
    if (!customer) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User Does not exist");
    }
    if (customer.role === "admin") {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Admin can not book a service");
    }
    if (!service) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Service Does not exist");
    }
    if (!slot) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Slot Does not exist");
    }
    //   check if slot is already booked
    const slotStatus = slot.isBooked;
    if (slotStatus === "booked") {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This slot is not available , Please select another slot");
    }
    //   update isBooked status
    const isBooked = yield slot_model_1.SlotModel.findOneAndUpdate({ isBooked: "booked" });
    const result = (yield (yield bookings_model_1.BookingModel.create(payload)).populate("service")).populate("slot");
    return result;
});
const getAllBookings = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bookings_model_1.BookingModel.find()
        .populate("customer")
        .populate("service")
        .populate("slot");
    return result;
});
const getMyBookings = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bookings_model_1.BookingModel.find({ customer: customerId })
        .populate("customer")
        .populate("service")
        .populate("slot");
    return result;
});
exports.BookingServices = {
    createBookings,
    getAllBookings,
    getMyBookings,
};
