import { Request } from "express";
import { validateTransaction, verifyTransactionId } from "../../providers";
import { getTransaction } from "../../repositories";
import { getToken } from "../../utils";

const getTransactionAndReturn = async (req: Request, transaction_id: Number) => {
  await verifyTransactionId(transaction_id);

  const userId = getToken(req);

  await validateTransaction(transaction_id, userId);

  const transaction = await getTransaction(transaction_id);

  return transaction;
};

export default getTransactionAndReturn;
