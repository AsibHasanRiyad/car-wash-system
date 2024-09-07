"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const bookings_validation_1 = require("./bookings.validation");
const bookings_controller_1 = require("./bookings.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post("/bookings", (0, auth_1.default)("user"), (0, validateRequest_1.default)(bookings_validation_1.BookingsValidation.createBookings), bookings_controller_1.BookingControllers.createBookings);
router.get("/bookings", (0, auth_1.default)("admin"), bookings_controller_1.BookingControllers.getAllBookings);
router.get("/my-bookings", (0, auth_1.default)("user"), bookings_controller_1.BookingControllers.getMyBookings);
exports.BookingRoute = router;
