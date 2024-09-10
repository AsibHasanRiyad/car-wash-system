import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TService } from "./service.interface";
import { ServiceModel } from "./service.model";

const createServiceIntoDB = async (payload: TService) => {
  const result = await ServiceModel.create(payload);
  return result;
};

const getAllServices = async () => {
  const result = await ServiceModel.find({ isDeleted: { $ne: true } });
  return result;
};
const getSingleServices = async (id: string) => {
  const isServiceExist = await ServiceModel.findById(id);
  if (!isServiceExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Service not found");
  }
  const result = await ServiceModel.findById(id);
  return result;
};

const updateService = async (id: string, payload: Partial<TService>) => {
  const isServiceExist = await ServiceModel.findById(id);
  if (!isServiceExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Service not found");
  }
  const result = await ServiceModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteService = async (id: string) => {
  const isServiceExist = await ServiceModel.findById(id);
  if (!isServiceExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Service not found");
  }
  const result = await ServiceModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true }
  );
  return result;
};

export const Services = {
  createServiceIntoDB,
  getAllServices,
  getSingleServices,
  deleteService,
  updateService,
};
