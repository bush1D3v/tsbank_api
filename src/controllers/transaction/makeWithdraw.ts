import { Request, Response } from "express";
import { handleError } from "../../error";
import { makeWithdrawAndReturn } from "../../services";
import { WithdrawParams } from "../../models";

export default async function makeWithdraw(req: Request, res: Response) {
  try {
    const { value, password } = req.body as WithdrawParams;

    const params = {
      value,
      password
    };

    const responseTransaction = await makeWithdrawAndReturn(req, params);

    return res.status(201).json(responseTransaction);
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
