import { z } from "zod";
import { cuidSchema } from "./common.schema.js";
import { FollowActionList, FollowRelationList } from "../types/types.js";

export const getFollowListSchema = z.object({
  params: cuidSchema.extend({
    type: z.enum(FollowRelationList),
  }),
});

export type GetFollowListParams = z.infer<typeof getFollowListSchema>["params"];

export const followUserSchema = z.object({
  params: cuidSchema,
});

export type FollowUserParams = z.infer<typeof followUserSchema>["params"];

export const updateFollowStatusSchema = z.object({
  params: cuidSchema.extend({
    type: z.enum(FollowActionList),
  }),
});

export type UpdateFollowStatusParams = z.infer<typeof updateFollowStatusSchema>["params"];
