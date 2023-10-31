import { Request, Response } from "express";
import { handleError } from "../../error";
import { TransactionParams } from "../../models";
import { insertTransactionAndReturn } from "../../services";

export default async function insertTransaction(req: Request, res: Response) {
  try {
    const { type, description, value } = req.body as TransactionParams;

    const transaction = {
      type,
      description,
      value
    };

    const newTransaction = await insertTransactionAndReturn(transaction, req);

    return res.status(201).json(newTransaction);
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
