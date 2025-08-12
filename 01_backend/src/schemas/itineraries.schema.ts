import z from "zod";
import { cuidSchema } from "./common.schema.js";

const dateSchema = z
  .union([z.date(), z.string()])
  .transform((val) => new Date(val));

const locationSchema = z.object({
  coordinates: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
  }),
  country: z.string().trim().max(255).optional(),
  city: z.string().trim().max(255).optional(),
  address: z.string().trim().max(255).optional(),
});

export type LocationSchema = z.infer<typeof locationSchema>;

const itineraryItemSchema = z.object({
  name: z.string().trim(),
  description: z.string().trim().optional(),
  cost: z.number().optional(),
  currency: z.string().trim().optional(),
  order: z.number().min(0),
  location: locationSchema,
});

export type ItineraryItemSchema = z.infer<typeof itineraryItemSchema>;

export const createItinerarySchema = z.object({
  body: z
    .object({
      title: z
        .string()
        .trim()
        .max(255, { message: "Title can be max 255 characters" }),
      description: z.string().trim().optional(),
      startDate: dateSchema.optional(),
      endDate: dateSchema.optional(),
      itineraryItems: z
        .array(itineraryItemSchema)
        .min(1, { message: "Itinerary must contain at least one item" }),
    })
    .refine((data) => {
      if (!data.startDate || !data.endDate) {
        return true;
      }
      return data.startDate <= data.endDate;
    }),
});

export type CreateItineraryBody = z.infer<typeof createItinerarySchema>["body"];

export const getItinerarySchema = z.object({
  params: cuidSchema,
});

export type GetItineraryParams = z.infer<typeof getItinerarySchema>["params"];

const updateItineraryItemSchema = itineraryItemSchema.extend({
  id: z.string().cuid(),
  name: z.string().trim().optional(),
  location: locationSchema.optional(),
});

export const updateItinerarySchema = z.object({
  params: cuidSchema,
  body: z.object({
    itineraryFields: z
      .object({
        title: z.string().trim().max(255).optional(),
        description: z.string().trim().optional(),
        startDate: dateSchema.optional(),
        endDate: dateSchema.optional(),
      })
      .optional(),
    updatedItems: z
      .array(
        updateItineraryItemSchema.extend({
          order: z.number().min(0).optional(),
        })
      )
      .default([]),
    newItems: z.array(itineraryItemSchema).default([]),
    deleteItemIds: z.array(z.string().cuid()).default([]),
  }),
});

export type UpdateItineraryParams = z.infer<
  typeof updateItinerarySchema
>["params"];
export type UpdateItineraryBody = z.infer<typeof updateItinerarySchema>["body"];
export type UpdateItineraryBodyUpdatedItems = z.infer<
  typeof updateItinerarySchema
>["body"]["updatedItems"];

export const deleteItinerarySchema = z.object({
  params: cuidSchema,
});

export type DeleteItineraryParams = z.infer<
  typeof deleteItinerarySchema
>["params"];
