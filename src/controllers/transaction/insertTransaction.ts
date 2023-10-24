import { Request, Response } from "express";
import { handleError } from "../../error";
import { TransactionParams } from "../../models";
import { insertTransactionAndReturn } from "../../services";

const insertTransaction = async (req: Request, res: Response) => {
  try {
    const { type, description, value, date, categorie_id } = req.body as TransactionParams;

    const transaction = {
      type,
      description,
      value,
      date,
      categorie_id
    };

    const newTransaction = await insertTransactionAndReturn(transaction, req);

    return res.status(201).json(newTransaction);
  } catch (error: any) {
    handleError(res, error, 400);
  }
};

export default insertTransaction;
