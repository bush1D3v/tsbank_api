import { Request, Response, NextFunction } from "express";
import { handleError } from "../../error";
import { getToken } from "../../utils";

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    getToken(req);

    next();
  } catch (error: any) {
    handleError(res, error, 401);
  }
};

export default auth;
