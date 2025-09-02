import {
  ItineraryItemSchema,
  ItinerarySchema,
  LocationSchema,
} from "../generated/zod/index.js";
import { z } from "../lib/zod.openapi.js";
import { cuidSchema, dateSchema } from "./common.schema.js";

const locationSchema = z
  .object({
    coordinates: z.object({
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180),
    }),
    country: z.string().trim().max(255).optional(),
    city: z.string().trim().max(255).optional(),
    address: z.string().trim().max(255).optional(),
  })
  .openapi("LocationInput");

export type LocationSchema = z.infer<typeof locationSchema>;

const itineraryItemSchema = z
  .object({
    name: z.string().trim(),
    description: z.string().trim().optional(),
    cost: z.number().optional(),
    currency: z.string().trim().optional(),
    order: z.number().min(0),
    location: locationSchema,
  })
  .openapi("ItineraryItemInput");

export type ItineraryItemSchema = z.infer<typeof itineraryItemSchema>;

export const createItinerarySchema = z
  .object({
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
  })
  .openapi("CreateItineraryRequest");

export type CreateItineraryBody = z.infer<typeof createItinerarySchema>["body"];

/**
 * FIX THIS LATER
 */
export const createItineraryResponseSchema = z
  .object({
    itineraryItems: z.array(
      ItineraryItemSchema.extend({ location: LocationSchema })
    ),
  })
  .openapi("CreateItineraryResponse");

export const getItinerarySchema = z
  .object({
    params: cuidSchema,
  })
  .openapi("GetItineraryRequest");

export type GetItineraryParams = z.infer<typeof getItinerarySchema>["params"];

const updateItineraryItemSchema = itineraryItemSchema
  .extend({
    id: z.string().cuid(),
    name: z.string().trim().optional(),
    location: locationSchema.optional(),
  })
  .openapi("UpdateItineraryItemRequest");

export const updateItinerarySchema = z
  .object({
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
  })
  .openapi("UpdateItineraryRequest");

export type UpdateItineraryParams = z.infer<
  typeof updateItinerarySchema
>["params"];
export type UpdateItineraryBody = z.infer<typeof updateItinerarySchema>["body"];
export type UpdateItineraryBodyUpdatedItems = z.infer<
  typeof updateItinerarySchema
>["body"]["updatedItems"];

export const deleteItinerarySchema = z
  .object({
    params: cuidSchema,
  })
  .openapi("DeleteItineraryRequest");

export type DeleteItineraryParams = z.infer<
  typeof deleteItinerarySchema
>["params"];
