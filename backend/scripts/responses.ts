import { ResponseConfig } from "@asteasolutions/zod-to-openapi";
import {
  errorResponseMessageSchema,
  internalServerErrorSchema,
  responseMessageSchema,
} from "../src/schemas/common.schema.js";

export const internalServerErrorResponse: ResponseConfig = {
  description: "Internal Server Error",
  content: {
    "application/json": {
      schema: internalServerErrorSchema,
    },
  },
};

export const errorMessageResponse = (
  description: string = "Error Response"
): ResponseConfig => ({
  description,
  content: {
    "application/json": {
      schema: errorResponseMessageSchema,
    },
  },
});

export const genericMessageResponse = (
  description: string = "Generic Response"
): ResponseConfig => ({
  description,
  content: {
    "application/json": {
      schema: responseMessageSchema,
    },
  },
});
