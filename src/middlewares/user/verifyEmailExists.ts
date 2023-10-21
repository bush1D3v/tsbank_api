import { Request, Response, NextFunction } from "express";
import { handleError } from "../../utils";
import { validateEmail } from "../../repositories";

const verifyEmailExists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    const emailExists = await validateEmail(email);

    if (emailExists) {
      throw new Error("Email already exists");
    }

    next();
  } catch (error: any) {
    handleError(res, error, 409);
  }
};

export default verifyEmailExists;
