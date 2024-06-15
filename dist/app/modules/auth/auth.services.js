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
exports.AuthServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createToken_1 = require("../../utils/createToken");
const auth_model_1 = require("./auth.model");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //checking if user already exists
    const email = payload.email;
    const exists = yield auth_model_1.User.findOne({ email });
    if (exists) {
        throw new AppError_1.default(409, "User Already Exists");
    }
    const user = payload;
    const result = yield auth_model_1.User.create(user);
    return result;
});
const userLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const email = payload.email;
    const password = payload.password;
    const user = yield auth_model_1.User.findOne({ email }).select("+password");
    // checking if user exists
    if (!user) {
        throw new AppError_1.default(404, "User Does not Exists");
    }
    // checking password
    const match = yield bcrypt_1.default.compare(password, user.password);
    if (!match) {
        throw new AppError_1.default(403, "Wrong Password");
    }
    // configuring jwt
    const jwtPayload = {
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, createToken_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, createToken_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return {
        accessToken,
        refreshToken,
        user,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the given token is valid
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_refresh_secret);
    const { email } = decoded;
    // checking if the user is exist
    const user = yield auth_model_1.User.findOne({ email });
    if (!user) {
        throw new AppError_1.default(404, "User not found !");
    }
    const jwtPayload = {
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, createToken_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return {
        accessToken,
    };
});
exports.AuthServices = {
    createUser,
    userLogin,
    refreshToken,
};
