import { Request, Response, NextFunction } from "express";
import { handleError } from "../../error";
import { TransactionWithdrawSchema } from "../../schemas";

export default async function verifyOutputTransaction(req: Request, res: Response, next: NextFunction) {
  try {
    await TransactionWithdrawSchema.validate(req.body);

    next();
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
