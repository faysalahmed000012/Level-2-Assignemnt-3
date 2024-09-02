import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../auth/auth.constants";
import { UserControllers } from "./user.controller";

const router = Router();

router.get("/", UserControllers.getAllUsers);
router.get("/email", UserControllers.getUserByEmail);
router.post("/admin", auth(USER_ROLE.admin), UserControllers.makeAdmin);

export const UserRoutes = router;
