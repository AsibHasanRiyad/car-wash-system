import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { SlotValidations } from "./slot.validation";
import { SlotController } from "./slot.controller";
import auth from "../../middlewares/auth";

const router = express.Router();
router.post(
  "/create-slot",
  auth("admin"),
  validateRequest(SlotValidations.createSlotValidationSchema),
  SlotController.createSlot
);

router.get("/availability", SlotController.getAllAvailableSlots);
router.patch(
  "/:id",
  auth("admin"),

  SlotController.updateSingleSlot
);
export const SlotRoutes = router;
