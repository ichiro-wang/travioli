import { Response } from "express";
import { ZodSchema } from "zod";

/**
 * this method is for validating the input data according to the specified Zod schema
 * @param schema pass in the schema you want to validate
 * @param data pass in the data coming from req.body, req.params, ...
 * @param res pass in the express Response object from the controller
 */
const validateData = <T>(schema: ZodSchema<T>, data: unknown, res: Response): T | null => {
  const parseResult = schema.safeParse(data);

  // if failed to validate
  if (!parseResult.success) {
    const errors = parseResult.error.flatten().fieldErrors;
    res.status(400).json({ message: errors });
    return null;
  }

  // if successfully validated
  return parseResult.data;
};

export default validateData;
