import { Request, Response, NextFunction } from "express";
import { handleError } from "../../error";
import { UpdatePhoneSchema } from "../../schemas";

export default async function verifyUpdatePhoneUserBody(req: Request, res: Response, next: NextFunction) {
  try {
    await UpdatePhoneSchema.validate(req.body);

    next();
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
