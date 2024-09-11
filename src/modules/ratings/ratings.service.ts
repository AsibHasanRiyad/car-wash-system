import { TRatings } from "./ratings.interface";
import { RatingsModel } from "./ratings.model";

const createRatings = async (payload: TRatings) => {
  const result = await RatingsModel.create(payload);
  return result;
};

const getAllRatings = async () => {
  const result = await RatingsModel.find();
  return result;
};

export const RatingService = {
  createRatings,
  getAllRatings,
};
