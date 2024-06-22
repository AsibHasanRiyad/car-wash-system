import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
const router = express.Router();

router.post(
  "/create-user",
  validateRequest(UserValidation.createUserValidationSchema),
  UserController.createUser
);
router.get("/", UserController.getAllUser);

export const UserRoutes = router;
