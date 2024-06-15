import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthControllers } from "./auth.controller";
import userValidationSchema, {
  refreshTokenValidationSchema,
} from "./auth.zod.validation";

const router = Router();

router.post(
  "/signup",
  validateRequest(userValidationSchema),
  AuthControllers.createUser
);

router.get("/login", AuthControllers.Login);

router.post(
  "/refresh-token",
  validateRequest(refreshTokenValidationSchema),
  AuthControllers.refreshToken
);

export const AuthRoutes = router;
