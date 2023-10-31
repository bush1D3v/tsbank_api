import { Request, Response, NextFunction } from "express";
import { handleError } from "../../error";
import { TransactionValueSchema } from "../../schemas/transaction";

export default async function verifyTransactionValue(req: Request, res: Response, next: NextFunction) {
  try {
    const { value } = req.body;

    await TransactionValueSchema.validate(req.body);

    if (isNaN(value) || Number(value) <= 0) {
      throw new Error("Invalid value");
    }

    next();
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
