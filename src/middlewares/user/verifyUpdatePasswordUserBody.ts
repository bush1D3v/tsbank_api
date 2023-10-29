import { Request, Response, NextFunction } from "express";
import { handleError } from "../../error";
import { updatePasswordSchema } from "../../schemas";

export default async function verifyUpdatePasswordUserBody(req: Request, res: Response, next: NextFunction) {
  try {
    await updatePasswordSchema.validate(req.body);

    next();
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
