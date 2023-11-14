import { Request, Response } from "express";
import { handleError } from "../../error";
import { deleteTransactionAndConfirm } from "../../services";
import { DeleteTransactionParams } from "../../models";

export default async function deleteTransaction(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { password } = req.body as DeleteTransactionParams;

    const params = {
      transaction_id: parseInt(id),
      password: password
    };

    await deleteTransactionAndConfirm(req, params);

    return res.json({
      message: "your transaction has been deleted successfully"
    });
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
