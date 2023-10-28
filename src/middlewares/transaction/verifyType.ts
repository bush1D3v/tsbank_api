import { Request, Response, NextFunction } from "express";
import { handleError } from "../../error";

export default function verifyType(req: Request, res: Response, next: NextFunction) {
  try {
    const { type } = req.body;

    if (type.toLowerCase() !== "input" && type.toLowerCase() !== "output") {
      throw new Error("Invalid value of 'type'");
    }

    next();
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
