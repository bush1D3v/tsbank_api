import { Request, Response, NextFunction } from "express";
import { handleError } from "../../error";
import { getToken } from "../../utils";

export default function auth(req: Request, res: Response, next: NextFunction) {
  try {
    getToken(req);

    next();
  } catch (error: any) {
    handleError(res, error, 401);
  }
};
