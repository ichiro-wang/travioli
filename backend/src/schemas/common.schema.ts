import { z } from "../lib/zod.openapi.js";

export const cuidSchema = z
  .object({
    id: z.string().cuid().openapi({ description: "User ID" }),
  })
  .openapi("Cuid");

export const usernameSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(3, { message: "Username can have minimum 3 characters" })
  .max(30, { message: "Username can have maximum 30 characters" })
  .regex(/^(?!_+$)[a-z0-9_]+$/, {
    message:
      "Username can only contain letters, numbers, and underscores; and cannot contain only underscores",
  })
  .openapi("Username", {
    description: "A username with letters, numbers, and underscores",
    example: "lebron_james_23",
  });

export const emailSchema = z
  .email({ message: "Invalid email format" })
  .openapi("Email", {
    description: "A valid email address",
    example: "lebronjames@gmail.com",
  });

export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .openapi("Password", {
    description: "A password with minimum 8 characters",
    example: "password123",
  });

export const responseMessageSchema = z
  .object({ message: z.string() })
  .openapi("ResponseMessage", {
    description: "A simple response with a message",
  });

export const errorResponseMessageSchema = z
  .object({ message: z.string(), errors: z.array(z.string()).optional() })
  .openapi("ErrorResponseMessage", {
    description:
      "A simple error response with a message, and optional array of errors",
  });

export const internalServerErrorSchema = z
  .object({
    message: z.string(),
    error: z.string().optional(),
    errorLocation: z.string().optional(),
  })
  .openapi("InternalServerError", {
    description: "Internal server error response",
  });

export const FilteredUser = z
  .object({
    id: cuidSchema.shape.id,
    username: usernameSchema,
    name: z.string().trim().max(255).nullable().openapi({ example: "LeBron" }),
    bio: z
      .string()
      .trim()
      .max(255)
      .nullable()
      .openapi({ example: "This is my bio" }),
    profilePic: z.string().openapi({ example: "https://profile_picture_link" }),
    isPrivate: z.boolean(),
    email: emailSchema.nullable(),
  })
  .openapi("FilteredUser");
