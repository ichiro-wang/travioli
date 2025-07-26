import { z } from "zod";
import { cuidSchema, usernameSchema } from "./common.schema.js";
import { UpdatePrivacyOptionsList } from "../types/types.js";

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
      name: z.string().trim().max(255).optional(),
      bio: z.string().trim().max(255).optional(),
    })
    .refine(
      (data) =>
        data.username !== undefined ||
        data.name !== undefined ||
        data.bio !== undefined,
      {
        message: "You must update at least one field",
      }
    ),
});

export type UpdateProfileBody = z.infer<typeof updateProfileSchema>["body"];

export const deleteAccountSchema = z.object({
  body: z.object({
    password: z.string(),
  }),
});

export type DeleteAccountBody = z.infer<typeof deleteAccountSchema>["body"];

export const getUserItinerariesSchema = z.object({
  params: cuidSchema,
  query: z.object({
    loadIndex: z.string(),
  }),
});

export type GetUserItinerariesParams = z.infer<
  typeof getUserItinerariesSchema
>["params"];

export type GetUserItinerariesQuery = z.infer<
  typeof getUserItinerariesSchema
>["query"];

export const updatePrivacySchema = z.object({
  body: z.object({
    toggleOption: z.enum(UpdatePrivacyOptionsList),
  }),
});

export type UpdatePrivacyBody = z.infer<typeof updatePrivacySchema>["body"];
