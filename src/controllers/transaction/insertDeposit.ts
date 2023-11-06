import { Request, Response } from "express";
import { handleError } from "../../error";
import { insertDepositAndReturn } from "../../services";
import { DepositParams } from "../../models";

export default async function insertDeposit(req: Request, res: Response) {
  try {
    const { value, email, password } = req.body as DepositParams;

    const params = {
      password,
      value,
      email
    };

    const responseTransaction = await insertDepositAndReturn(req, params);

    return res.status(201).json(responseTransaction);
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
