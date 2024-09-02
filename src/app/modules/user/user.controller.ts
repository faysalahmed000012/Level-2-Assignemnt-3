import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.services";

const getAllUsers = async (req: Request, res: Response) => {
  const users = await UserServices.getAllUser();
  if (users.length === 0) {
    res.status(400).json({
      success: false,
      statusCode: 404,
      message: "User not Found",
      data: [],
    });
  }

  res.status(200).json({
    success: true,
    message: "All Users Retrieved successfully",
    data: users,
  });
};

const getUserByEmail = async (req: Request, res: Response) => {
  const email = req.query.email as string;
  const user = await UserServices.getUserByEmail(email);
  if (!user) {
    res.status(400).json({
      success: false,
      statusCode: 404,
      message: "User not Found",
      data: [],
    });
  }

  res.status(200).json({
    success: true,
    message: "User Retrieved successfully",
    data: user,
  });
};

const makeAdmin = catchAsync(async (req, res) => {
  const user = req.body;
  const result = await UserServices.makeAdmin(user);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Admin created successfully",
    data: result,
  });
});

export const UserControllers = {
  getAllUsers,
  getUserByEmail,
  makeAdmin,
};
