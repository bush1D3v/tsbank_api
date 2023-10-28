import { Request, Response } from "express";
import { handleError } from "../../error";
import { TransactionParams } from "../../models";
import { updateTransactionAndReturn } from "../../services";

export default async function updateTransaction(req: Request, res: Response) {
  try {
    const { type, description, value, category_id } = req.body as TransactionParams;
    const { id } = req.params;

    const params = {
      type,
      description,
      value,
      category_id
    };

    const response = await updateTransactionAndReturn(req, params, parseInt(id));

    return res.json(response);
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
