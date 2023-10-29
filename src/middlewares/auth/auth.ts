import { Request, Response, NextFunction } from "express";
import { handleError } from "../../error";
import { getToken } from "../../utils";
import { getUserPerId } from "../../repositories";

export default async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const id = getToken(req);

    await getUserPerId(id);

    next();
  } catch (error: any) {
    handleError(res, error, 401);
  }
};
