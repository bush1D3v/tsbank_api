import { Request, Response } from "express";
import { handleError } from "../../error";
import { CardTransactionParams } from "../../models";
import { insertCardTransactionAndReturn } from "../../services";

export default async function insertCardTransaction(req: Request, res: Response) {
  try {
    const { password, card_type, value } = req.body as CardTransactionParams;

    const params = {
      password,
      card_type,
      value
    };

    const responseTransaction = await insertCardTransactionAndReturn(req, params);

    return res.status(201).json(responseTransaction);
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
