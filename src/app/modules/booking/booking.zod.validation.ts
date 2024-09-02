import { z } from "zod";

const bookingValidationSchema = z.object({
  body: z
    .object({
      date: z.string().min(1, "Date is required"),
      startTime: z.string(),
      endTime: z.string(),
      user: z.string().optional(),
      facility: z.string().min(1, "Facility is required"),
      payableAmount: z.number().optional(),
      isBooked: z
        .enum(["confirmed", "unconfirmed", "canceled"], {
          message:
            "Invalid booking status. Allowed values: confirmed, unconfirmed, canceled",
        })
        .optional(),
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);

        return end > start;
      },
      {
        message: "Start time should be before End time !  ",
      }
    ),
});

export default bookingValidationSchema;
