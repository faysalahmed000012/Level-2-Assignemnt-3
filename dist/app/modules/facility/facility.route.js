"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_constants_1 = require("../auth/auth.constants");
const facility_controllers_1 = require("./facility.controllers");
const facility_zod_validation_1 = __importDefault(require("./facility.zod.validation"));
const router = (0, express_1.Router)();
router.get("/", facility_controllers_1.FacilityControllers.getAllFacility);
router.get("/:id", facility_controllers_1.FacilityControllers.getFacilityById);
router.post("/", (0, auth_1.default)(auth_constants_1.USER_ROLE.admin), (0, validateRequest_1.default)(facility_zod_validation_1.default), facility_controllers_1.FacilityControllers.createFacility);
router.put("/:id", (0, auth_1.default)(auth_constants_1.USER_ROLE.admin), facility_controllers_1.FacilityControllers.updateFacility);
router.delete("/:id", (0, auth_1.default)(auth_constants_1.USER_ROLE.admin), facility_controllers_1.FacilityControllers.deleteFacility);
exports.FacilityRoutes = router;
