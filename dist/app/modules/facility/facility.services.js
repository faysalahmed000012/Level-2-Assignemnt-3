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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityServices = void 0;
const facility_model_1 = require("./facility.model");
const getAllFacility = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.Facility.find().lean();
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
    createFacility,
    updateFacility,
    deleteFacility,
};
