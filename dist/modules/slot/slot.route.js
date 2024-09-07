"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const slot_validation_1 = require("./slot.validation");
const slot_controller_1 = require("./slot.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post("/create-slot", (0, auth_1.default)("admin"), (0, validateRequest_1.default)(slot_validation_1.SlotValidations.createSlotValidationSchema), slot_controller_1.SlotController.createSlot);
router.get("/availability", slot_controller_1.SlotController.getAllAvailableSlots);
exports.SlotRoutes = router;
