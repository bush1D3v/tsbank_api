import { Request, Response, NextFunction } from "express";
import { handleError } from "../../error";
import { TransactionSchema } from "../../schemas";

export default async function verifyTransactionBody(req: Request, res: Response, next: NextFunction) {
  try {
    await TransactionSchema.validate(req.body);

    next();
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
