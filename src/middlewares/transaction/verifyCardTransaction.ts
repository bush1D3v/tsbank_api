import { Request, Response, NextFunction } from "express";
import { handleError } from "../../error";
import { CardTransactionSchema } from "../../schemas";
import { validateCardType } from "../../repositories";

export default async function verifyCardTransaction(req: Request, res: Response, next: NextFunction) {
  try {
    await CardTransactionSchema.validate(req.body);

    const { card_type } = req.body;

    validateCardType(card_type);

    next();
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
