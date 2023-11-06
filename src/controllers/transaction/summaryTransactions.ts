import { Request, Response } from "express";
import { summaryTransactionsAndReturn } from "../../services";
import { handleError } from "../../error";

export default async function summaryTransactions(req: Request, res: Response) {
  try {
    const summaryValue = await summaryTransactionsAndReturn(req);

    return res.json(summaryValue);
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
