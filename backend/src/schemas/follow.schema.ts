import { z } from "zod";
import { cuidSchema } from "./common.schema.js";
import { FollowActionList, FollowRelationList } from "../types/types.js";

export const getFollowListSchema = z.object({
  params: cuidSchema.extend({
    type: z.enum(FollowRelationList),
  }),
  query: z.object({
    page: z.string(),
  }),
});

export type GetFollowListParams = z.infer<typeof getFollowListSchema>["params"];
export type GetFollowListQuery = z.infer<typeof getFollowListSchema>["query"];

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

export const getFollowStatusSchema = z.object({
  params: cuidSchema,
});

export type GetFollowStatusParams = z.infer<typeof getFollowStatusSchema>["params"];
