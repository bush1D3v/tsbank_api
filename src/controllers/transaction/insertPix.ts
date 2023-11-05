import { Request, Response } from "express";
import { handleError } from "../../error";
import { PixParams } from "../../models";
import { insertPixAndConfirm } from "../../services";

export default async function insertPix(req: Request, res: Response) {
  try {
    const { cpf, password, value } = req.body as PixParams;

    const params = {
      cpf,
      password,
      value
    };

    const responseTransaction = await insertPixAndConfirm(req, params);

    return res.status(201).json(responseTransaction);
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
