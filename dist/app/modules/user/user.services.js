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
exports.UserServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const auth_model_1 = require("../auth/auth.model");
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield auth_model_1.User.find();
    return response;
});
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield auth_model_1.User.findOne({ email: email });
    return response;
});
const makeAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //checking if user already exists
    const email = payload.email;
    const exists = yield auth_model_1.User.findOne({ email });
    if (exists) {
        throw new AppError_1.default(409, "User Already Exists");
    }
    const user = Object.assign(Object.assign({}, payload), { role: "admin" });
    const result = yield auth_model_1.User.create(user);
    return result;
});
exports.UserServices = {
    getAllUser,
    getUserByEmail,
    makeAdmin,
};
