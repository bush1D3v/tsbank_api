import { Request, Response, NextFunction } from "express";
import { handleError } from "../../error";
import { UpdatePasswordSchema } from "../../schemas";

export default async function verifyUpdatePasswordUserBody(req: Request, res: Response, next: NextFunction) {
  try {
    await UpdatePasswordSchema.validate(req.body);

    next();
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
