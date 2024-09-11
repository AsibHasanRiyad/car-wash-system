import { Schema, model } from "mongoose";
import { TRatings } from "./ratings.interface";

const ratingSchema = new Schema<TRatings>({
  rating: { type: Number, required: true },
  feedback: { type: String, required: true },
});

export const RatingsModel = model<TRatings>("Rating", ratingSchema);
