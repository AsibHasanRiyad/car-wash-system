import express from "express";
import { ServiceController } from "./service.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ServiceValidation } from "./service.validation";

const router = express.Router();

router.post(
  "/create-service",
  validateRequest(ServiceValidation.createServiceValidationSchema),
  ServiceController.createService
);
// get all services
router.get("/", ServiceController.getAllServices);
// get single services
router.get("/:id", ServiceController.getSingleServices);

export const ServiceRoutes = router;
