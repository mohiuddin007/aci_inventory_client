import { z } from "zod";

export const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signupSchema = loginSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
});
