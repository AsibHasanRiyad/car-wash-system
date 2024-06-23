/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export type TUserRole = "admin" | "user";
export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: TUserRole;
  address: string;
};

export type TUserLogin = {
  email: string;
  password: string;
};

export interface TUserModel extends Model<TUser> {
  isUserExistByCustomEmail(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
