import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
const router = express.Router();

router.post(
  "/signup",
  validateRequest(UserValidation.createUserValidationSchema),
  UserController.createUser
);
router.post(
  "/login",
  validateRequest(UserValidation.loginUserValidationSchema),
  UserController.loginUser
);
router.get("/", UserController.getAllUser);

export const UserRoutes = router;
