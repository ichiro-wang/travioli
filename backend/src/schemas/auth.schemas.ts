import { z } from "zod";
import { usernameSchema } from "./common.schema.js";

export const signupSchema = z.object({
  body: z
    .object({
      email: z.string().trim().email(),
      username: usernameSchema,
      password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
      confirmPassword: z.string().min(8),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    }),
});

export type SignupBody = z.infer<typeof signupSchema>["body"];

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

export type LoginBody = z.infer<typeof loginSchema>["body"];
