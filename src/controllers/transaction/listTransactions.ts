import { Request, Response } from "express";
import { getTransactionsAndReturn } from "../../services";
import { handleError } from "../../error";

export default async function listTransactions(req: Request, res: Response) {
  try {
    const transactions = await getTransactionsAndReturn(req);

    return res.json(transactions);
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
