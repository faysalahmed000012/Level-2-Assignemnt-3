import { z } from "zod";

const facilityValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(1, "Facility name is required")
      .max(30, "Facility name cannot exceed 30 characters"),
    description: z.string().min(1, "Description is required"),
    pricePerHour: z
      .number()
      .positive({ message: "Price per hour must be a positive number" })
      .transform((value) => parseFloat(value.toFixed(2))), // Ensure two decimal places
    location: z.string().min(1, "Location is required"),
    isDeleted: z.boolean().default(false),
  }),
});

export default facilityValidationSchema;
