import { Request, Response, NextFunction } from "express";
import { handleError } from "../../error";
import { getToken } from "../../utils";
import { getUserPerId } from "../../repositories";
import { undefinedUser } from "../../providers";

export default async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const id = getToken(req);

    const user = await getUserPerId(id);

    undefinedUser(user);

    next();
  } catch (error: any) {
    handleError(res, error, 401);
  }
};
