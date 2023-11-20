import { Request, Response, NextFunction } from "express";
import { handleError } from "../../error";

type Type = {
  type: string;
}

export default function verifyType(req: Request, res: Response, next: NextFunction) {
  try {
    const { type } = req.body as Type;

    if (type.toLowerCase() !== "input" && type.toLowerCase() !== "output") {
      throw new Error("invalid value of 'type'");
    }

    next();
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
