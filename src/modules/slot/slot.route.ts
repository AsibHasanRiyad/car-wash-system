import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { SlotValidations } from "./slot.validation";
import { SlotController } from "./slot.controller";

const router = express.Router();
router.post(
  "/create-slot",
  validateRequest(SlotValidations.createSlotValidationSchema),
  SlotController.createSlot
);

router.get("/availability", SlotController.getAllAvailableSlots);
export const SlotRoutes = router;
