import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { ServiceRoutes } from "../modules/service/service.route";
import { SlotRoutes } from "../modules/slot/slot.route";
import { BookingRoute } from "../modules/bookings/bookings.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/services",
    route: ServiceRoutes,
  },
  {
    path: "/slots",
    route: SlotRoutes,
  },
  {
    path: "/bookings",
    route: BookingRoute,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
