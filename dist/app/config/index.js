"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join((process.cwd(), ".env")) });
exports.default = {
    mongo_uri: process.env.MONGO_URI,
    port: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt_refresh_expires_in: process.env.JWT_REFRESHTOKEN_EXPIRESIN,
    jwt_refresh_secret: process.env.JWT_REFRESHTOKEN_SECRET,
    jwt_access_expires_in: process.env.JWT_ACCESSTOKEN_EXPIRESIN,
    jwt_access_secret: process.env.JWT_ACCESSTOKEN_SECRET,
};
