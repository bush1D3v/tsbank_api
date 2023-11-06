import { Request, Response, NextFunction } from "express";
import { handleError } from "../../error";
import { CardSchema } from "../../schemas";
import { validateCardType } from "../../repositories";

export default async function verifyCardBody(req: Request, res: Response, next: NextFunction) {
  try {
    await CardSchema.validate(req.body);

    const { card_type } = req.body;

    validateCardType(card_type);

    next();
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
