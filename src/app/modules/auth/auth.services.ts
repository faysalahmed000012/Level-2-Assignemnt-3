import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
import { createToken } from "../../utils/createToken";
import IUser, { ILogin } from "./auth.interface";
import { User } from "./auth.model";

const createUser = async (payload: IUser) => {
  //checking if user already exists
  const email = payload.email;
  const exists = await User.findOne({ email });
  if (exists) {
    throw new AppError(409, "User Already Exists");
  }
  const user = payload;
  const result = await User.create(user);
  return result;
};

const userLogin = async (payload: ILogin) => {
  const email = payload.email;
  const password = payload.password;
  const user = await User.findOne({ email }).select("+password");

  // checking if user exists
  if (!user) {
    throw new AppError(404, "User Does not Exists");
  }
  // checking password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new AppError(403, "Wrong Password");
  }

  // configuring jwt
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    user,
  };
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload;

  const { email } = decoded;

  // checking if the user is exist
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(404, "User not found !");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  createUser,
  userLogin,
  refreshToken,
};
