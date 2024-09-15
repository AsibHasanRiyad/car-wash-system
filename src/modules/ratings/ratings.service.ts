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
const averageRatings = async () => {
  const ratings = await RatingsModel.find();
  if (ratings.length === 0) {
    return 0;
  }
  const totalRatings = ratings.reduce((acc, rating) => acc + rating.rating, 0);
  const averageRating = totalRatings / ratings.length;
  return averageRating;
};

export const RatingService = {
  createRatings,
  getAllRatings,
  averageRatings,
};
