import { z } from "../lib/zod.openapi.js";
import {
  cuidSchema,
  FilteredUser,
  passwordSchema,
  usernameSchema,
} from "./common.schema.js";
import { UpdatePrivacyOptionsList } from "../types/types.js";
import { FollowStatusSchema, ItinerarySchema } from "../generated/zod/index.js";

export const checkUsernameSchema = z
  .object({
    query: z.object({
      username: usernameSchema,
    }),
  })
  .openapi("CheckUsernameRequest");

export type CheckUsernameQuery = z.infer<typeof checkUsernameSchema>["query"];

export const checkUsernameResponseSchema = z
  .object({
    message: z.string(),
    available: z.boolean(),
  })
  .openapi("CheckUsernameResponse");

export const getProfileSchema = z
  .object({
    params: cuidSchema,
  })
  .openapi("GetProfileRequest");

export type GetProfileParams = z.infer<typeof getProfileSchema>["params"];

export const getProfileResponseSchema = z
  .object({
    user: FilteredUser,
    isSelf: z.boolean(),
    followedByCount: z.number().int().nonnegative(),
    followingCount: z.number().int().nonnegative(),
    followStatus: FollowStatusSchema.optional(),
  })
  .openapi("GetProfileResponse");

export const updateProfileSchema = z
  .object({
    body: z
      .object({
        username: usernameSchema.optional(),
        name: z
          .string()
          .trim()
          .max(255)
          .optional()
          .openapi({ example: "LeBron James" }),
        bio: z
          .string()
          .trim()
          .max(255)
          .optional()
          .openapi({ example: "This is my bio" }),
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
  })
  .openapi("UpdateProfileRequest");

export type UpdateProfileBody = z.infer<typeof updateProfileSchema>["body"];

export const updateProfileResponseSchema = z.object({
  user: FilteredUser,
});

export const deleteAccountSchema = z
  .object({
    body: z.object({
      password: passwordSchema,
    }),
  })
  .openapi("DeleteAccountRequest");

export type DeleteAccountBody = z.infer<typeof deleteAccountSchema>["body"];

export const deleteAccountResponseSchema = z.object({
  user: FilteredUser.extend({ isDeleted: z.boolean() }),
});

export const getUserItinerariesSchema = z
  .object({
    params: cuidSchema,
    query: z.object({
      loadIndex: z.string().optional().openapi({
        description:
          "A positive integer to specify which entries to retrieve for pagination",
      }),
    }),
  })
  .openapi("GetUserItinerariesRequest");

export type GetUserItinerariesParams = z.infer<
  typeof getUserItinerariesSchema
>["params"];

export type GetUserItinerariesQuery = z.infer<
  typeof getUserItinerariesSchema
>["query"];

export const getUserItinerariesResponseSchema = z
  .object({
    itineraries: z.array(ItinerarySchema),
    pagination: z.object({
      loadIndex: z.number().int().nonnegative(),
      hasMore: z.boolean(),
    }),
  })
  .openapi("GetUserItinerariesResponse");

export const updatePrivacySchema = z
  .object({
    body: z.object({
      toggleOption: z
        .enum(UpdatePrivacyOptionsList)
        .openapi({ description: "Toggle privacy of account" }),
    }),
  })
  .openapi("UpdatePrivacyRequest");

export type UpdatePrivacyBody = z.infer<typeof updatePrivacySchema>["body"];
