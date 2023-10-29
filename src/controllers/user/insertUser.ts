import { Request, Response } from "express";
import { handleError } from "../../error";
import { insertUserAndReturn } from "../../services";
import { UserParams } from "../../models";

export default async function insertUser(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body as UserParams;

    const params = { name, email, password };

    const user = await insertUserAndReturn(params);

    return res.status(201).json(user);
  } catch (error: any) {
    console.log(error);
    handleError(res, error, 400);
  }
};
