import { z } from "zod";

export const cuidSchema = z.object({
  id: z.string().cuid(),
});

export const usernameSchema = z
  .string()
  .trim()
  .min(3, { message: "Username can have minimum 3 characters" })
  .max(30, { message: "Username can have maximum 30 characters" })
  .regex(/^[a-zA-Z0-9_]+$/, {
    message: "Username can only contain letters, numbers, and underscores",
  });

export const emailSchema = z.string().trim().max(255).email({ message: "Invalid email format" });

export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" });
