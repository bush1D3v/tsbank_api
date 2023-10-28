import { Request } from "express";
import { getToken } from "../../utils";
import { createNewTransaction } from "../../repositories";
import { TransactionParams } from "../../models";
import { verifyCategorieId } from "../../providers";

export default async function insertTransactionAndReturn(params: TransactionParams, req: Request) {
  await verifyCategorieId(params.category_id);

  const userId = getToken(req);

  const newTransaction = await createNewTransaction(params, userId);

  return newTransaction;
};
