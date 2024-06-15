"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenValidationSchema = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"),
        email: zod_1.z
            .string()
            .email({ message: "Invalid email format" })
            .min(1, "Email is required"),
        password: zod_1.z.string().min(1, "Password is required"),
        phone: zod_1.z.string().min(1, "Phone number is required"),
        role: zod_1.z.enum(["admin", "user"], {
            message: "Invalid role. Allowed values: admin, user",
        }),
        address: zod_1.z.string().min(1, "Address is required"),
    }),
});
exports.refreshTokenValidationSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: "Refresh token is required!",
        }),
    }),
});
exports.default = userValidationSchema;
