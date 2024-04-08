import * as z from "zod";

export const DayTaskValidation = z.object({
  title: z.string().min(3, { message: "Minimum 3 characters." }).max(34, { message: "Maximum 34 characters." }),
});
