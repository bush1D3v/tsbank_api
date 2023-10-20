import { Request, Response } from "express";
import { handleError } from "../../utils";
import { LoginUserParams } from "../../models";
import { loginUserAndReturn } from "../../services";

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as LoginUserParams;

    const response = await loginUserAndReturn(email, password);

    return res.send(response);
  } catch (error: any) {
    handleError(res, error, 401);
  }
};

export default loginUser;
