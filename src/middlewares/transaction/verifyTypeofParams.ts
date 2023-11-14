import { Request, Response, NextFunction } from "express";
import { handleError } from "../../error";

export default function verifyTypeofParams(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      throw new Error("invalid value of 'id' parameter");
    }

    next();
  } catch (error: any) {
    handleError(res, error, 400);
  }
}
