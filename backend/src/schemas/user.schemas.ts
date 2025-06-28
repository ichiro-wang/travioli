import { z } from "zod";
import { cuidSchema, usernameSchema } from "./common.schema.js";

export const checkUsernameSchema = z.object({
  query: z.object({
    username: usernameSchema,
  }),
});

export type CheckUsernameQuery = z.infer<typeof checkUsernameSchema>["query"];

export const getProfileSchema = z.object({
  params: cuidSchema,
});

export type GetProfileParams = z.infer<typeof getProfileSchema>["params"];

export const updateProfileSchema = z.object({
  body: z
    .object({
      username: usernameSchema.optional(),
      name: z.string().max(255).optional(),
      bio: z.string().max(255).optional(),
    })
    .refine(
      (data) => data.username !== undefined || data.name !== undefined || data.bio !== undefined,
      { message: "You must update at least one field" }
    ),
});

export type UpdateProfileBody = z.infer<typeof updateProfileSchema>["body"];

export const deleteAccountSchema = z.object({
  body: z.object({
    password: z.string(),
  }),
});

export type DeleteAccountBody = z.infer<typeof deleteAccountSchema>["body"];
