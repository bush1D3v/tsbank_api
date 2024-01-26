import { Request } from "express";
import { getTransaction } from "../../repositories";
import { getToken } from "../../utils";
import { validateTransaction, verifyTransactionId } from "../../providers";

export default async function getTransactionAndReturn(req: Request, transaction_id: number) {
  await verifyTransactionId(transaction_id);

  const userId = getToken(req);

  await validateTransaction(transaction_id, userId);

  const transaction = await getTransaction(transaction_id);

  return transaction;
};
