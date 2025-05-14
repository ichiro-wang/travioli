import { z } from "zod";

export const idParamSchema = z.object({
  id: z.string().cuid(),
});

export const usernameSchema = z
  .string()
  .trim()
  .min(3)
  .max(30)
  .regex(/^[a-zA-Z0-9_]+$/, {
    message: "Username can only contain letters, numbers, and underscores",
  });
