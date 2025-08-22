import { z } from "../lib/zod.openapi.js";

export const imageSchema = z
  .instanceof(File)
  .refine(
    (file) => ["image/png", "image/jpg", "image/jpeg"].includes(file.type),
    {
      message: "Invalid image file type",
    }
  );

export const videoSchema = z
  .instanceof(File)
  .refine((file) => ["video/mp4"].includes(file.type), {
    message: "Invalid video file type",
  });
