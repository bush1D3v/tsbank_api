import { Request, Response } from "express";
import { handleError } from "../../error";
import { LoginUserParams } from "../../models";
import { loginUserAndReturn } from "../../services";

export default async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body as LoginUserParams;

    const response = await loginUserAndReturn(email, password);

    return res.send(response);
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
