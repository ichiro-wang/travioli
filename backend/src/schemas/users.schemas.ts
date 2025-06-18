import { z } from "zod";
import { cuidSchema, usernameSchema } from "./common.schema.js";

export const checkUsernameSchema = z.object({
  params: z.object({
    username: usernameSchema,
  }),
});

export type CheckUsernameParams = z.infer<typeof checkUsernameSchema>["params"];

export const getFollowListSchema = z.object({
  body: z.object({
    type: z.enum(["followedBy", "following"]),
  }),
  params: cuidSchema,
});

export type GetFollowListBody = z.infer<typeof getFollowListSchema>["body"];

export const updateProfileSchema = z.object({
  body: z.object({
    username: usernameSchema.optional(),
    name: z.string().max(30).optional(),
    bio: z.string().optional(),
    isPrivate: z.boolean().optional(),
  }),
  params: cuidSchema,
});

export type UpdateProfileBody = z.infer<typeof updateProfileSchema>["body"];

export const deleteAccountSchema = z.object({
  body: z.object({
    password: z.string(),
  }),
  params: cuidSchema,
});

export type DeleteAccountBody = z.infer<typeof deleteAccountSchema>["body"];
