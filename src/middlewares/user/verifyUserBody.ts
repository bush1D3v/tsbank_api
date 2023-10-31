import { Request, Response, NextFunction } from "express";
import { UserSchema } from "../../schemas";
import { handleError } from "../../error";

export default async function verifyUserBody(req: Request, res: Response, next: NextFunction) {
  try {
    await UserSchema.validate(req.body);

    next();
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
