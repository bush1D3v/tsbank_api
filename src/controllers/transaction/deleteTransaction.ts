import { Request, Response } from "express";
import { handleError } from "../../error";
import { deleteTransactionAndConfirm } from "../../services";

export default async function deleteTransaction(req: Request, res: Response) {
  try {
    const { id } = req.params;

    await deleteTransactionAndConfirm(req, parseInt(id));

    return res.json({
      message: "Your transaction has been deleted successfully"
    });
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
