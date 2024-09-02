import AppError from "../../errors/AppError";
import IUser from "../auth/auth.interface";
import { User } from "../auth/auth.model";

const getAllUser = async () => {
  const response = await User.find();
  return response;
};

const getUserByEmail = async (email: string) => {
  const response = await User.findOne({ email: email });
  return response;
};

const makeAdmin = async (payload: IUser) => {
  //checking if user already exists
  const email = payload.email;
  const exists = await User.findOne({ email });
  if (exists) {
    throw new AppError(409, "User Already Exists");
  }
  const user = { ...payload, role: "admin" };
  const result = await User.create(user);
  return result;
};

export const UserServices = {
  getAllUser,
  getUserByEmail,
  makeAdmin,
};
