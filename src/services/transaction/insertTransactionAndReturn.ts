import { Request } from "express";
import { getToken } from "../../utils";
import { createNewTransaction } from "../../repositories";
import { TransactionParams } from "../../models";

export default async function insertTransactionAndReturn(params: TransactionParams, req: Request) {
  const userId = getToken(req);

  const newTransaction = await createNewTransaction(params, userId);

  return newTransaction;
};
