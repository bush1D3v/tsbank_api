import { Request, Response, NextFunction } from "express";
import { handleError } from "../../error";
import { DepositSchema } from "../../schemas";

export default async function verifyDepositTransaction(req: Request, res: Response, next: NextFunction) {
  try {
    await DepositSchema.validate(req.body);

    next();
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
