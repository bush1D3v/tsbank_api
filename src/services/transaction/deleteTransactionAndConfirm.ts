import { Request } from "express";
import { dropTransaction } from "../../repositories";
import { validateTransaction, verifyTransactionId } from "../../providers";
import { getToken } from "../../utils";

export default async function deleteTransactionAndConfirm(req: Request, transaction_id: number) {
  await verifyTransactionId(transaction_id);

  const userId = getToken(req);

  await validateTransaction(transaction_id, userId);

  await dropTransaction(transaction_id);
};
