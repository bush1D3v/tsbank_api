import { Request, Response, NextFunction } from "express";
import { handleError } from "../../error";
import { PasswordSchema } from "../../schemas";

export default async function verifyPassword(req: Request, res: Response, next: NextFunction) {
  try {
    await PasswordSchema.validate(req.body);

    next();
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
