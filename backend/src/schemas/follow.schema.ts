import { z } from "zod";
import { cuidSchema } from "./common.schema.js";

export const getFollowListSchema = z.object({
  params: cuidSchema.extend({
    type: z.enum(["followedBy", "following"]),
  }),
});

export type GetFollowListSchema = z.infer<typeof getFollowListSchema>["params"];

export const followUserSchema = z.object({
  params: cuidSchema,
});

export type FollowUserSchema = z.infer<typeof followUserSchema>["params"];

export const updateFollowStatusSchema = z.object({
  params: cuidSchema.extend({
    type: z.enum(["accept", "reject", "cancel", "unfollow"]),
  }),
});

export type UpdateFollowStatusSchema = z.infer<typeof updateFollowStatusSchema>["params"];
