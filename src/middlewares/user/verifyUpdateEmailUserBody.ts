import { Request, Response, NextFunction } from "express";
import { handleError } from "../../error";
import { updateMailSchema } from "../../schemas";

export default async function verifyUpdateEmailUserBody(req: Request, res: Response, next: NextFunction) {
  try {
    await updateMailSchema.validate(req.body);

    next();
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
