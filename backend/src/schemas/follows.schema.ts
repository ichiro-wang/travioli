import { z } from "../lib/zod.openapi.js";
import { cuidSchema, FilteredUser } from "./common.schema.js";
import { FollowActionList, FollowRelationList } from "../types/types.js";
import { FollowsSchema, FollowStatusSchema } from "../generated/zod/index.js";

export const getFollowListSchema = z
  .object({
    params: cuidSchema.extend({
      type: z.enum(FollowRelationList),
    }),
    query: z.object({
      loadIndex: z.string(),
    }),
  })
  .openapi("GetFollowListRequest");

export type GetFollowListParams = z.infer<typeof getFollowListSchema>["params"];
export type GetFollowListQuery = z.infer<typeof getFollowListSchema>["query"];

export const getFollowListResponseSchema = z
  .object({
    following: z.array(FilteredUser).optional(),
    followedBy: z.array(FilteredUser).optional(),
    pagination: z.object({
      loadIndex: z.number().int().nonnegative(),
      hasMore: z.boolean(),
    }),
  })
  .refine(
    (data) => data.followedBy !== undefined || data.following !== undefined,
    { message: "Must return one of following of followedBy" }
  )
  .openapi("GetFollowListResponse");

export const followUserSchema = z
  .object({
    params: cuidSchema,
  })
  .openapi("FollowUserRequest");

export type FollowUserParams = z.infer<typeof followUserSchema>["params"];

export const followUserResponseSchema = z
  .object({
    message: z.string(),
    follow: FollowsSchema,
  })
  .openapi("FollowUserResponse");

export const updateFollowStatusSchema = z
  .object({
    params: cuidSchema,
    body: z.object({
      type: z.enum(FollowActionList),
    }),
  })
  .openapi("UpdateFollowStatusRequest");

export type UpdateFollowStatusParams = z.infer<
  typeof updateFollowStatusSchema
>["params"];
export type UpdateFollowStatusBody = z.infer<
  typeof updateFollowStatusSchema
>["body"];

export const updateFollowStatusResponseSchema = z.object({
  message: z.string(),
  follow: FollowsSchema,
});

export const getFollowStatusSchema = z
  .object({
    params: cuidSchema,
  })
  .openapi("GetFollowStatusRequest");

export type GetFollowStatusParams = z.infer<
  typeof getFollowStatusSchema
>["params"];

export const getFollowStatusResponseSchema = z
  .object({
    followStatus: FollowStatusSchema,
  })
  .openapi("GetFollowStatusResponse");

export const getFollowRequestsResponseSchema = z
  .object({
    pendingRequests: z.array(FollowsSchema),
  })
  .openapi("GetFollowRequestsResponse");
