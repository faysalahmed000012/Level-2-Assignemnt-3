import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.services";

const createUser = catchAsync(async (req, res) => {
  const user = req.body;
  const result = await AuthServices.createUser(user);

  res.status(201).json({
    success: true,
    statusCode: 201,
    message: "Signed Up Successfully",
    data: result,
  });
});

const Login = catchAsync(async (req, res) => {
  const result = await AuthServices.userLogin(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "User logged in successfully",
    token: accessToken,
    data: {
      _id: result.user._id,
      name: result.user.name,
      email: result.user.email,
      role: result.user.role,
      phone: result.user.phone,
      address: result.user.address,
    },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "AccessToken Generated Successfully",
    data: result,
  });
});

export const AuthControllers = {
  createUser,
  Login,
  refreshToken,
};
