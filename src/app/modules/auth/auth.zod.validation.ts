import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .email({ message: "Invalid email format" })
      .min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
    phone: z.string().min(1, "Phone number is required"),
    role: z
      .enum(["admin", "user"], {
        message: "Invalid role. Allowed values: admin, user",
      })
      .optional(),
    address: z.string().min(1, "Address is required"),
  }),
});

export const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh token is required!",
    }),
  }),
});

export default userValidationSchema;
