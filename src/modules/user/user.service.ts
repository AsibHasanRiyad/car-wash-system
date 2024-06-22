import config from "../../config";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUserIntoDB = async (payload: TUser) => {
  if (!payload.password) {
    payload.password = config.default_password as string;
  }
  const result = await UserModel.create(payload);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
};
