import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { ServiceRoutes } from "../modules/service/service.route";
import { SlotRoutes } from "../modules/slot/slot.route";
import { BookingRoute } from "../modules/bookings/bookings.route";
import { RatingRoutes } from "../modules/ratings/ratings.route";
import { PaymentRoutes } from "../modules/payment/payment.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
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
    path: "/ratings",
    route: RatingRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
  {
    path: "/",
    route: BookingRoute,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
