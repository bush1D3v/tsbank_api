import { Request, Response } from "express";
import { handleError } from "../../error";
import { makeCardPayAndConfirm } from "../../services";
import { CardPayParams } from "../../models";

export default async function makeCardPay(req: Request, res: Response) {
  try {
    const { value, password } = req.body as CardPayParams;

    const params = {
      value,
      password
    };

    const transactionResponse = await makeCardPayAndConfirm(req, params);

    return res.status(201).json(transactionResponse);
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
