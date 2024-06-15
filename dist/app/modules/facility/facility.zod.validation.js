"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const facilityValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .trim()
            .min(1, "Facility name is required")
            .max(30, "Facility name cannot exceed 30 characters"),
        description: zod_1.z.string().min(1, "Description is required"),
        pricePerHour: zod_1.z
            .number()
            .positive({ message: "Price per hour must be a positive number" })
            .transform((value) => parseFloat(value.toFixed(2))), // Ensure two decimal places
        location: zod_1.z.string().min(1, "Location is required"),
        isDeleted: zod_1.z.boolean().default(false),
    }),
});
exports.default = facilityValidationSchema;
