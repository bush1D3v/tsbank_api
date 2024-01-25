import { Request } from "express";
import { getTransaction } from "../../repositories";
import { getToken } from "../../utils";
import { validateTransaction, verifyTransactionId } from "../../providers";

export default async function getTransactionAndReturn(req: Request, transaction_id: number) {
  await verifyTransactionId(transaction_id);

  const userId = getToken(req);

  const result = await Promise.all([
    validateTransaction(transaction_id, userId),
    getTransaction(transaction_id)
  ]);

  const transaction = result[ 1 ];

  return transaction;
};
