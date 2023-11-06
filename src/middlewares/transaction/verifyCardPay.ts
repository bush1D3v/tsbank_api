import { Request, Response, NextFunction } from "express";
import { handleError } from "../../error";
import { CardPaySchema } from "../../schemas";

export default async function verifyCardPay(req: Request, res: Response, next: NextFunction) {
  try {
    await CardPaySchema.validate(req.body);

    next();
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
