import { Request, Response } from "express";
import { handleError } from "../../error";
import { insertUserAndReturn } from "../../services";
import { UserParams } from "../../models";

const insertUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body as UserParams;

    const params = { name, email, password };

    const user = await insertUserAndReturn(req, params);

    return res.status(201).json(user);
  } catch (error: any) {
    handleError(res, error, 409);
  }
};

export default insertUser;
