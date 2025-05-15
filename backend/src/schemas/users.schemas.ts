import { z } from "zod";
import { cuidParamsSchema, usernameSchema } from "./common.schema.js";

export const getProfileSchema = z.object({
  params: cuidParamsSchema,
});

export type GetProfileParams = z.infer<typeof getProfileSchema>["params"];

export const updateProfileSchema = z.object({
  body: z.object({
    username: usernameSchema,
    name: z.string().max(30),
    bio: z.string(),
    isPrivate: z.boolean(),
  }),
  params: cuidParamsSchema,
});

export type UpdateProfileBody = z.infer<typeof updateProfileSchema>["body"];
export type UpdateProfileParams = z.infer<typeof updateProfileSchema>["params"];
