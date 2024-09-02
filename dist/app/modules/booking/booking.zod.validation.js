"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const bookingValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        date: zod_1.z.string().min(1, "Date is required"),
        startTime: zod_1.z.string(),
        endTime: zod_1.z.string(),
        user: zod_1.z.string().optional(),
        facility: zod_1.z.string().min(1, "Facility is required"),
        payableAmount: zod_1.z.number().optional(),
        isBooked: zod_1.z
            .enum(["confirmed", "unconfirmed", "canceled"], {
            message: "Invalid booking status. Allowed values: confirmed, unconfirmed, canceled",
        })
            .optional(),
    })
        .refine((body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
    }, {
        message: "Start time should be before End time !  ",
    }),
});
exports.default = bookingValidationSchema;
