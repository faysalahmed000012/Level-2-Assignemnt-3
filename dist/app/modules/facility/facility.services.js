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
exports.FacilityServices = void 0;
const queryBuilder_1 = __importDefault(require("../../../builder/queryBuilder"));
const facility_model_1 = require("./facility.model");
const getAllFacility = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const facilityQuery = new queryBuilder_1.default(facility_model_1.Facility.find({ isDeleted: false }), query)
        .filter()
        .paginate();
    const meta = yield facilityQuery.countTotal();
    const facilities = yield facilityQuery.modelQuery;
    return { facilities, meta };
});
const getFacilityById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.Facility.findOne({ _id: id });
    return result;
});
const createFacility = (facility) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.Facility.create(facility);
    return result;
});
const updateFacility = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.Facility.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteFacility = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.Facility.findOneAndUpdate({ _id: id }, { isDeleted: true }, { new: true });
    return result;
});
exports.FacilityServices = {
    getAllFacility,
    getFacilityById,
    createFacility,
    updateFacility,
    deleteFacility,
};
