import { Request, Response, NextFunction } from "express";
import { handleError } from "../../utils";
import { loginUserSchema } from "../../schemas";

const verifyLoginUserBody = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await loginUserSchema.validate(req.body);

    next();
  } catch (error: any) {
    handleError(res, error, 400);
  }
};

export default verifyLoginUserBody;
