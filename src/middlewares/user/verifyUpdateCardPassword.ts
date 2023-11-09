import { Request, Response, NextFunction } from "express";
import { handleError } from "../../error";
import { UpdateCardPasswordSchema } from "../../schemas";
import { validateCardType } from "../../providers";

export default async function verifyUpdateCardPassword(req: Request, res: Response, next: NextFunction) {
  try {
    await UpdateCardPasswordSchema.validate(req.body);

    const { card_type } = req.body;

    validateCardType(card_type);

    next();
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
