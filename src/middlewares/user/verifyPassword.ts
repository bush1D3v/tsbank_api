import { Request, Response, NextFunction } from "express";
import { handleError } from "../../error";
import { passwordSchema } from "../../schemas";

export default async function verifyPassword(req: Request, res: Response, next: NextFunction) {
  try {
    await passwordSchema.validate(req.body);

    next();
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
