import { Request, Response } from "express";
import { handleError } from "../../error";
import { TransactionParams } from "../../models";
import { updateTransactionAndReturn } from "../../services";

const updateTransaction = async (req: Request, res: Response) => {
  try {
    const { type, description, value, categorie_id } = req.body as TransactionParams;
    const { id } = req.params;

    const params = {
      type,
      description,
      value,
      categorie_id
    };

    const response = await updateTransactionAndReturn(req, params, parseInt(id));

    return res.json(response);
  } catch (error: any) {
    handleError(res, error, 400);
  }
};

export default updateTransaction;
