import { z } from "../lib/zod.openapi.js";
import {
  emailSchema,
  FilteredUser,
  passwordSchema,
  usernameSchema,
} from "./common.schema.js";

export const signupSchema = z
  .object({
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
  })
  .openapi("SignupRequest");

export type SignupBody = z.infer<typeof signupSchema>["body"];

export const verifyEmailSchema = z
  .object({
    query: z.object({
      token: z.string(),
    }),
  })
  .openapi("VerifyEmailRequest");

export type VerifyEmailQuery = z.infer<typeof verifyEmailSchema>["query"];

export const resendVerificationEmailSchema = z
  .object({
    body: z.object({
      email: emailSchema,
    }),
  })
  .openapi("ResendVerificationEmailRequest");

export type ResendVerificationEmailBody = z.infer<
  typeof resendVerificationEmailSchema
>["body"];

export const loginSchema = z
  .object({
    body: z.object({
      email: emailSchema,
      password: passwordSchema,
    }),
  })
  .openapi("LoginRequest");

export type LoginBody = z.infer<typeof loginSchema>["body"];

export const loginResponseSchema = z
  .object({
    user: FilteredUser,
  })
  .openapi("LoginResponse");
