import { z } from "zod";
import { cuidSchema } from "./common.schema.js";

export const getFollowListSchema = z.object({
  params: cuidSchema.extend({
    type: z.enum(["followedBy", "following"])
  }),
});

export type GetFollowListSchema = z.infer<typeof getFollowListSchema>["params"];
