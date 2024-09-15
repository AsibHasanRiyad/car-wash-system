import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TService } from "./service.interface";
import { ServiceModel } from "./service.model";
import QueryBuilder from "../../utils/QueryBuilder";

const createServiceIntoDB = async (payload: TService) => {
  const result = await ServiceModel.create(payload);
  return result;
};

const getAllServices = async (queryParams: Record<string, unknown>) => {
  const serviceQuery = new QueryBuilder(ServiceModel.find(), queryParams);
  serviceQuery.search(["name"]).filter().sort().paginate().fields();
  const result = await serviceQuery.modelQuery;
  const meta = await serviceQuery.countTotal();
  return { result, meta };
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
