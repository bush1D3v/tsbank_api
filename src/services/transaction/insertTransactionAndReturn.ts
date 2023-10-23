import { Request } from "express";
import { getToken } from "../../utils";
import { createNewTransaction } from "../../repositories";
import { TransactionParams } from "../../models";

const insertTransactionAndReturn = async (params: TransactionParams, req: Request) => {
  const userId = getToken(req);

  const newTransaction = await createNewTransaction(params, userId);

  return newTransaction;
};

export default insertTransactionAndReturn;
