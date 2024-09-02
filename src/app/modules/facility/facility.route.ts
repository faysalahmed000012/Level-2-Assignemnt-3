import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../auth/auth.constants";
import { FacilityControllers } from "./facility.controllers";
import facilityValidationSchema from "./facility.zod.validation";

const router = Router();

router.get("/", FacilityControllers.getAllFacility);
router.get("/:id", FacilityControllers.getFacilityById);
router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(facilityValidationSchema),
  FacilityControllers.createFacility
);

router.put("/:id", auth(USER_ROLE.admin), FacilityControllers.updateFacility);

router.delete(
  "/:id",
  auth(USER_ROLE.admin),
  FacilityControllers.deleteFacility
);

export const FacilityRoutes = router;
