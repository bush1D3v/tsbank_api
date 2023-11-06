import { Request, Response, NextFunction } from "express";
import { handleError } from "../../error";
import { PixSchema } from "../../schemas";

export default async function verifyPixValue(req: Request, res: Response, next: NextFunction) {
  try {
    await PixSchema.validate(req.body);

    next();
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
