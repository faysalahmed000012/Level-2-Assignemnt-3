"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constants_1 = require("../auth/auth.constants");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
router.get("/", user_controller_1.UserControllers.getAllUsers);
router.get("/email", user_controller_1.UserControllers.getUserByEmail);
router.post("/admin", (0, auth_1.default)(auth_constants_1.USER_ROLE.admin), user_controller_1.UserControllers.makeAdmin);
exports.UserRoutes = router;
