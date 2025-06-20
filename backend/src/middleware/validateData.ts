import { Request, Response, NextFunction } from "express";
import { ZodError, ZodTypeAny } from "zod";
import { internalServerError } from "../utils/internalServerError.js";

/**
 * middleware for validating input data
 * @param schema the schema you want to follow
 */
export const validateData = (schema: ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req);
      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => issue.message);

        // if just one error, return directly. else, return the array of error messages
        const message = errorMessages.length === 1 ? errorMessages[0] : errorMessages;

        res.status(400).json({ message });
      } else {
        internalServerError(error, res, "validateData middleware");
      }
    }
  };
};
