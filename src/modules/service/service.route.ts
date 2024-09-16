import express from "express";
import { ServiceController } from "./service.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ServiceValidation } from "./service.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/create-service",
  auth("admin"),
  validateRequest(ServiceValidation.createServiceValidationSchema),
  ServiceController.createService
);
// get all services
router.get("/", ServiceController.getAllServices);
// get single service
router.get("/:id", ServiceController.getSingleServices);
// delete single service
router.delete("/:id", auth("admin"), ServiceController.deleteSingleService);
// update single service
router.patch(
  "/:id",
  auth("admin"),
  validateRequest(ServiceValidation.updateServiceValidationSchema),
  ServiceController.updateSingleService
);

export const ServiceRoutes = router;
