import { Request, Response } from "express";
import { internalServerError } from "../utils/internalServerError.js";
import { UpdatePrivacyBody } from "../schemas/settings.schema.js";

export const updatePrivacy = async (
  req: Request<{}, {}, UpdatePrivacyBody>,
  res: Response
): Promise<void> => {
  try {
    const { toggleOption } = req.body;

    // TODO
  } catch (error: unknown) {
    internalServerError(error, res, "updatePrivacy controller");
  }
};
