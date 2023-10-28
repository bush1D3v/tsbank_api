import { Request } from "express";
import { TransactionParams } from "../../models";
import { validateTransaction, verifyTransactionId } from "../../providers";
import { updateTransaction } from "../../repositories";
import { getToken } from "../../utils";

export default async function updateTransactionAndReturn(req: Request, params: TransactionParams, transaction_id: number) {
  await verifyTransactionId(transaction_id);

  const userId = getToken(req);

  await validateTransaction(transaction_id, userId);

  const transaction = await updateTransaction(params, transaction_id);

  return transaction;
};
