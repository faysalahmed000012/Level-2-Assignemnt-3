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
exports.PaymentServices = void 0;
const booking_model_1 = require("../booking/booking.model");
const confirmationService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const update = yield booking_model_1.Booking.findOneAndUpdate({ tranId: id }, { isBooked: "confirmed" }, { new: true });
    return update;
});
const failedPayment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.deleteOne({ tranId: id });
    return result;
});
exports.PaymentServices = {
    confirmationService,
    failedPayment,
};
