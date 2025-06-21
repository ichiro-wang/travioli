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

        res.status(400).json({ message: "Invalid input data", errors: errorMessages });
        return;
      } else {
        internalServerError(error, res, "validateData middleware");
      }
    }
  };
};
