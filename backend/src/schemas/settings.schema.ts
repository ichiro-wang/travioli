import { z } from "zod";
import { UpdatePrivacyOptionsList } from "../types/types.js";

export const updatePrivacySchema = z.object({
  body: z.object({
    toggleOption: z.enum(UpdatePrivacyOptionsList),
  }),
});

export type UpdatePrivacyBody = z.infer<typeof updatePrivacySchema>["body"];
