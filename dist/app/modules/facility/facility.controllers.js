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
exports.FacilityControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const facility_services_1 = require("./facility.services");
const getAllFacility = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const facilities = yield facility_services_1.FacilityServices.getAllFacility();
    if (facilities.length === 0) {
        res.status(400).json({
            success: false,
            statusCode: 404,
            message: "No Data Found",
            data: [],
        });
    }
    res.status(200).json({
        success: true,
        message: "All Facility Retrieved successfully",
        data: facilities,
    });
});
const createFacility = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const facility = req.body;
    const facilities = yield facility_services_1.FacilityServices.createFacility(facility);
    res.status(201).json({
        success: true,
        statusCode: 201,
        message: "Facility Created successfully",
        data: facilities,
    });
});
const updateFacility = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const body = req.body;
    const result = yield facility_services_1.FacilityServices.updateFacility(id, body);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Facility updated successfully",
        data: result,
    });
}));
const deleteFacility = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield facility_services_1.FacilityServices.deleteFacility(id);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Facility deleted Successfully",
        data: result,
    });
}));
exports.FacilityControllers = {
    getAllFacility,
    createFacility,
    updateFacility,
    deleteFacility,
};
