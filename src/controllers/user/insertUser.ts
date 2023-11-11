import { Request, Response } from "express";
import { handleError } from "../../error";
import { insertUserAndReturn } from "../../services";
import { UserParams } from "../../models";

export default async function insertUser(req: Request, res: Response) {
  try {
    const { name, email, password, cpf, phone } = req.body as UserParams;

    const params = {
      name,
      email,
      password,
      cpf,
      phone
    };

    const user = await insertUserAndReturn(params);

    return res.status(201).json(user);
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
