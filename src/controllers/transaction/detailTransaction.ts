import { Request, Response } from "express";
import { handleError } from "../../error";
import { getTransactionAndReturn } from "../../services";

export default async function detailTransaction(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const transaction = await getTransactionAndReturn(req, parseInt(id));

    return res.json(transaction);
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
