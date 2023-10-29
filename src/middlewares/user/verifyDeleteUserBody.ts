import { Request, Response, NextFunction } from "express";
import { handleError } from "../../error";
import { deleteUserSchema } from "../../schemas";

export default async function verifyDeleteUserBody(req: Request, res: Response, next: NextFunction) {
  try {
    await deleteUserSchema.validate(req.body);

    next();
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
