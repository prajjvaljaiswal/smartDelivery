import { z } from "zod";

export const partnerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.coerce.number({
    required_error: "Phone number is required",
    invalid_type_error: "Phone number must be a number",
  }),
  area: z.string().min(1, "Area is required"),
  shift: z.object({
    start: z.string().min(1, "Start time is required"),
    end: z.string().min(1, "End time is required"),
  }),
});

export type FormValues = z.infer<typeof partnerSchema>;

export const searchSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type SearchValues = z.infer<typeof searchSchema>;
