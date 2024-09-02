"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const user_services_1 = require("./user.services");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_services_1.UserServices.getAllUser();
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
});
const getUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email;
    const user = yield user_services_1.UserServices.getUserByEmail(email);
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
});
const makeAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const result = yield user_services_1.UserServices.makeAdmin(user);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Admin created successfully",
        data: result,
    });
}));
exports.UserControllers = {
    getAllUsers,
    getUserByEmail,
    makeAdmin,
};
