import { z } from "zod";
import { emailSchema, passwordSchema, usernameSchema } from "./common.schema.js";

export const signupSchema = z.object({
  body: z
    .object({
      email: emailSchema,
      username: usernameSchema,
      password: passwordSchema,
      confirmPassword: passwordSchema,
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
    }),
});

export type SignupBody = z.infer<typeof signupSchema>["body"];

export const loginSchema = z.object({
  body: z.object({
    email: emailSchema,
    password: passwordSchema,
  }),
});

export type LoginBody = z.infer<typeof loginSchema>["body"];
