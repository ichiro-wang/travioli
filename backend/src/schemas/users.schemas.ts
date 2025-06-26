import { z } from "zod";
import { cuidSchema, usernameSchema } from "./common.schema.js";

export const checkUsernameSchema = z.object({
  params: z.object({
    username: usernameSchema,
  }),
});

export type CheckUsernameParams = z.infer<typeof checkUsernameSchema>["params"];

export const updateProfileSchema = z.object({
  body: z
    .object({
      username: usernameSchema.optional(),
      name: z.string().max(255).optional(),
      bio: z.string().max(255).optional(),
      isPrivate: z.boolean().optional(),
    })
    .refine(
      (data) =>
        data.username !== undefined ||
        data.name !== undefined ||
        data.bio !== undefined ||
        data.isPrivate !== undefined,
      { message: "You must update at least one field" }
    ),
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
