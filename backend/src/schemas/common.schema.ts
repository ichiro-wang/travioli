import { z } from "zod";

export const cuidSchema = z.object({
  id: z.string().cuid(),
});

export const cuidParamsSchema = z.object({
  params: cuidSchema,
});

export type CuidParams = z.infer<typeof cuidParamsSchema>["params"];

export const usernameSchema = z
  .string()
  .trim()
  .min(3)
  .max(30)
  .regex(/^[a-zA-Z0-9_]+$/, {
    message: "Username can only contain letters, numbers, and underscores",
  });
