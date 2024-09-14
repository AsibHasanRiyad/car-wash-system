import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import auth from "../../middlewares/auth";
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
router.get("/users", auth("admin"), UserController.getAllUser);
router.patch("/users/:id", auth("admin"), UserController.updateUser);
router.patch(
  "/user-profile/:id",
  auth("user"),
  UserController.updateUserProfile
);

export const UserRoutes = router;
