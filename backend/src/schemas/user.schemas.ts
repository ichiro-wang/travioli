import { z } from "zod";
import { usernameSchema } from "./common.schema.js";

export const updateProfileSchema = z.object({
  username: usernameSchema,
  name: z.string().max(30),
  bio: z.string(),
  isPrivate: z.boolean(),
});
