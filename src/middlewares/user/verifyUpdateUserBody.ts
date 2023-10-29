import { Request, Response, NextFunction } from "express";
import { handleError } from "../../error";
import { UpdateUserSchema } from "../../schemas";

export default async function verifyUpdateUserBody(req: Request, res: Response, next: NextFunction) {
  try {
    await UpdateUserSchema.validate(req.body);

    next();
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
