import { Request, Response, NextFunction } from "express";
import { handleError } from "../../utils";
import { getToken } from "../../utils";

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const verifyer = getToken(req);

    next();
  } catch (error: any) {
    handleError(res, error, 401);
  }
};

export default auth;
