import { Request, Response, NextFunction } from "express";
import { userSchema } from "../../schemas";
import { handleError } from "../../error";

export default async function verifyUserBody(req: Request, res: Response, next: NextFunction) {
  try {
    await userSchema.validate(req.body);

    next();
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
