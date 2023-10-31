import { Request, Response } from "express";
import { handleError } from "../../error";
import { insertDepositAndConfirm } from "../../services";

export default async function insertDeposit(req: Request, res: Response) {
  try {
    const { value } = req.body;

    await insertDepositAndConfirm(req, value);

    return res.status(201).json({
      message: "Deposit successfully"
    });
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
