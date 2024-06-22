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

export const SlotRoutes = router;
