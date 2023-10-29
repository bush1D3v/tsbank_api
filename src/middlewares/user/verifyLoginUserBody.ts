import { Request, Response, NextFunction } from "express";
import { handleError } from "../../error";
import { LoginUserSchema } from "../../schemas";

export default async function verifyLoginUserBody(req: Request, res: Response, next: NextFunction) {
  try {
    await LoginUserSchema.validate(req.body);

    next();
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
