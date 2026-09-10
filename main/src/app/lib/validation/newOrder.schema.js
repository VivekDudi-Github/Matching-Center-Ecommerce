import { z } from "zod";

export const newOrderFormSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.email().min(2),
  address: z.string().min(2),
  area: z.string().min(2),
  locality: z.string().min(2),
  landmark: z.string().min(2),
  city: z.string().min(2),
  state: z.string().min(2),
  pincode: z.string().min(2),
  payment: z.string().min(2),
  notes: z.string().min(2),
});