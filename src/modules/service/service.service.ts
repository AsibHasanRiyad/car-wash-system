import { TService } from "./service.interface";
import { ServiceModel } from "./service.model";

const createServiceIntoDB = async (payload: TService) => {
  const result = await ServiceModel.create(payload);
  return result;
};

const getAllServices = async () => {
  const result = await ServiceModel.find();
  return result;
};
const getSingleServices = async (id: string) => {
  const result = await ServiceModel.findById(id);
  return result;
};

export const Services = {
  createServiceIntoDB,
  getAllServices,
  getSingleServices,
};
