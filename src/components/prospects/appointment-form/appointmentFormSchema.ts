
import { z } from "zod";

export const formSchema = z.object({
  date: z.date({
    required_error: "La fecha es obligatoria",
  }),
  time: z.string().min(1, { message: "La hora es obligatoria" }),
  location: z.string().min(3, { message: "La ubicación es obligatoria" }),
  type: z.string().min(1, { message: "El tipo de cita es obligatorio" }),
  notes: z.string().optional(),
});

export type FormValues = z.infer<typeof formSchema>;
