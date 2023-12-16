import { Request, Response } from "express";
import { handleError } from "../../error";
import { getHistoryAndReturn } from "../../services";

export default async function getHistory(req: Request, res: Response) {
  try {
    const filteredTransactions = await getHistoryAndReturn(req);

    return res.json(filteredTransactions);
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
