import express from "express";
import { RatingController } from "./ratings.controller";

const router = express.Router();

router.post("/create-ratings", RatingController.createRatings);
router.get("/", RatingController.getAllRatings);
router.get("/average-ratings", RatingController.getAverageRatings);

export const RatingRoutes = router;
