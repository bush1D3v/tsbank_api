import getTransactionsAndReturn from "../../services/transaction/getTransactionsAndReturn";
import { handleError } from "../../error";
import { Request, Response } from "express";

const listTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await getTransactionsAndReturn(req);

    return res.json(transactions);
  } catch (error: any) {
    handleError(res, error, 404);
  }
};

export default listTransactions;
